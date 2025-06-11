"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const review_model_1 = require("../models/review.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.router = (0, express_1.Router)();
exports.router.post("/", async (req, res) => {
    try {
        const { clientName, content, rating } = req.body;
        if (!clientName || !content || !rating) {
            res.status(400).send("All fields are required");
            return;
        }
        const review = await review_model_1.Review.create({ clientName, content, rating });
        res.status(201).json(review);
    }
    catch (error) {
        console.error("Error creating review:", error);
        res.status(500).send("Server error");
    }
});
exports.router.get("/", async (_, res) => {
    try {
        const reviews = await review_model_1.Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send("Server error");
    }
});
exports.router.delete("/:id", async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
        res.status(401).send("Missing token");
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.SESSION_SECRET);
        if (decode.role !== "admin") {
            res.status(403).send("Only admin can delete reviews");
            return;
        }
        const deleted = await review_model_1.Review.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).send("Review was not found");
            return;
        }
        res.status(204).end();
    }
    catch (error) {
        console.error("Deleted error:", error);
        res.status(401).send("Invalid token");
    }
});
