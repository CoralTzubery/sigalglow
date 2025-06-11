"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const appointment_model_1 = require("../models/appointment.model");
exports.router = (0, express_1.Router)();
exports.router.post("/", async (req, res) => {
    try {
        const { clientName, phoneNumber, date, time, treatmentId } = req.body;
        if (!clientName || !phoneNumber || !date || !time || !treatmentId) {
            res.status(400).send("All fields required");
            return;
        }
        const newAppointment = await appointment_model_1.Appointment.create({
            clientName,
            phoneNumber,
            date,
            time,
            treatmentId,
        });
        res.status(201).json(newAppointment);
    }
    catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).send("Server error");
    }
});
exports.router.get("/", async (_, res) => {
    try {
        const appointments = await appointment_model_1.Appointment.find();
        res.json(appointments);
    }
    catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("Server error");
    }
});
exports.router.get("/:id", async (req, res) => {
    try {
        const appointment = await appointment_model_1.Appointment.findById(req.params.id);
        if (!appointment) {
            res.status(404).send("Appointment was not found");
            return;
        }
        res.json(appointment);
    }
    catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).send("Server error");
    }
});
exports.router.put("/:id", async (req, res) => {
    try {
        const updated = await appointment_model_1.Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).send("Appointment was not found");
            return;
        }
        res.json(updated);
    }
    catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).send("Server error");
    }
});
exports.router.delete("/:id", async (req, res) => {
    try {
        const deleted = await appointment_model_1.Appointment.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).send("Appointment was not found");
            return;
        }
        res.status(204).end();
    }
    catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).send("Server error");
    }
});
