"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const contact_model_1 = require("../models/contact.model");
exports.router = (0, express_1.Router)();
exports.router.post("/", async (req, res) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;
        if (!fullName || !email || !phone || !subject || !message) {
            res.status(400).send("All fields are required");
            return;
        }
        const contact = await contact_model_1.Contact.create({ fullName, email, phone, subject, message });
        res.status(201).json(contact);
    }
    catch (error) {
        console.error("Error creating contact message:", error);
        res.status(500).send("Server error");
    }
});
