"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const about_model_1 = require("../models/about.model");
exports.router = (0, express_1.Router)();
exports.router.get("/", async (_req, res) => {
    try {
        const sections = await about_model_1.About.find();
        res.json(sections);
    }
    catch (error) {
        console.error("Failed to fetch about sections:", error);
        res.status(500).json({ message: "Intrernal Server Error" });
    }
});
exports.router.post("/", async (req, res) => {
    try {
        const { id, title, content } = req.body;
        const section = await about_model_1.About.create({ id, title, content });
        res.status(201).json(section);
    }
    catch (error) {
        console.error("Faild to create about section:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
