import { Router } from "express";
import { Contact } from "../models/contact.model";

export const router = Router();

router.post("/", async (req, res) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;

        if (!fullName || !email || !phone || !subject || !message) {
            res.status(400).send("All fields are required");
            return;
        }

        const contact = await Contact.create({ fullName, email, phone, subject, message });
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating contact message:", error);
        res.status(500).send("Server error");
    }
});