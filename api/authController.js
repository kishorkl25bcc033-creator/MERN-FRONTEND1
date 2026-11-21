const crypto = require("crypto");
const { promisify } = require("util");
const mongoose = require("mongoose");
const User = require("./userModel");

const scrypt = promisify(crypto.scrypt);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordLength = 64;

function isDatabaseConnected() {
    return mongoose.connection.readyState === 1;
}

function validateCredentials({ name, email, password }, includeName) {
    if (
        (includeName && (typeof name !== "string" || !name.trim() || name.trim().length > 80)) ||
        typeof email !== "string" ||
        !emailPattern.test(email.trim()) ||
        typeof password !== "string" ||
        password.length < 8 ||
        password.length > 128
    ) {
        return false;
    }

    return true;
}

function publicUser(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        lastLoginAt: user.lastLoginAt,
    };
}

async function signup(req, res, next) {
    const { name, email, password } = req.body || {};
    if (!validateCredentials({ name, email, password }, true)) {
        return res.status(400).json({ message: "Enter a name, valid email, and password between 8 and 128 characters." });
    }
    if (!isDatabaseConnected()) {
        return res.status(503).json({ message: "Account service is unavailable. Please try again shortly." });
    }

    try {
        const passwordSalt = crypto.randomBytes(16).toString("hex");
        const passwordHash = (await scrypt(password, passwordSalt, passwordLength)).toString("hex");
        const user = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            passwordSalt,
            passwordHash,
        });

        return res.status(201).json({ user: publicUser(user) });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "An account with this email already exists." });
        }
        return next(error);
    }
}

async function signin(req, res, next) {
    const { email, password } = req.body || {};
    if (!validateCredentials({ email, password }, false)) {
        return res.status(400).json({ message: "Enter a valid email and password." });
    }
    if (!isDatabaseConnected()) {
        return res.status(503).json({ message: "Account service is unavailable. Please try again shortly." });
    }

    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() })
            .select("+passwordSalt +passwordHash");
        if (!user) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        const submittedHash = await scrypt(password, user.passwordSalt, passwordLength);
        const storedHash = Buffer.from(user.passwordHash, "hex");
        if (storedHash.length !== submittedHash.length || !crypto.timingSafeEqual(storedHash, submittedHash)) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        user.lastLoginAt = new Date();
        await user.save();
        return res.json({ user: publicUser(user) });
    } catch (error) {
        return next(error);
    }
}

module.exports = { signup, signin };
