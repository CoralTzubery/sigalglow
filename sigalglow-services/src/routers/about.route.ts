import { Router } from "express";
import { About } from "../models/about.model";
import { Request, Response } from "express";

export const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const sections = await About.find();
        res.json(sections);
    } catch (error) {
        console.error("Failed to fetch about sections:", error);
        res.status(500).json({ message: "Intrernal Server Error" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { id, title, content } = req.body;
        const section = await About.create({ id, title, content }); 
        res.status(201).json(section);
    } catch (error) {
        console.error("Faild to create about section:", error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
});