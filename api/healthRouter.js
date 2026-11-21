const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
});

module.exports = router;
