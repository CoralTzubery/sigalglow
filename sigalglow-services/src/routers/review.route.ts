import { Router } from "express";
import { Review } from "../models/review.model";

export const router = Router();

router.post("/", async (req, res) => {
    try {
        const { clientName, content, rating } = req.body;

        if (!clientName || !content || !rating) {
            res.status(400).send("All fields are required");
            return;
        }

        const review = await Review.create({ clientName, content, rating });
        res.status(201).json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).send("Server error");
    }
});

router.get("/", async (_, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send("Server error");
    }
});