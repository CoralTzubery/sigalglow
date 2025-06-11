import { Router } from "express";
import { Review } from "../models/review.model";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const router = Router();

router.post("/", async (req: Request, res: Response) => {
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

router.get("/", async (_, res: Response) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send("Server error");
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).send("Missing token");
        return;
    }

    try {
        const decode = jwt.verify(token, process.env.SESSION_SECRET!) as JwtPayload;

        if (decode.role !== "admin") {
            res.status(403).send("Only admin can delete reviews");
            return;
        }

        const deleted = await Review.findByIdAndDelete(req.params.id);
        
        if (!deleted) {
            res.status(404).send("Review was not found");
            return;
        }

        res.status(204).end();
    } catch (error) {
        console.error("Deleted error:", error);
        res.status(401).send("Invalid token");
    }
});