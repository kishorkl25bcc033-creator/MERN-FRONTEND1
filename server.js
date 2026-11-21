require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const healthRouter = require("./api/healthRouter");
const authRouter = require("./api/authRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api", (_req, res) => {
    res.status(404).json({ message: "API endpoint not found." });
});

const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));
app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return next();
    }

    res.sendFile(path.join(buildPath, "index.html"), (error) => {
        if (error) {
            next(error);
        }
    });
});

app.use((error, req, res, next) => {
    console.error("Request failed:", error.message);
    if (req.path.startsWith("/api/")) {
        return res.status(500).json({ message: "The request could not be completed. Please try again." });
    }
    return next(error);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB connected successfully"))
        .catch((error) => console.error("MongoDB connection failed:", error.message));
} else {
    console.warn("MONGO_URL is not set; starting without a database connection.");
}
