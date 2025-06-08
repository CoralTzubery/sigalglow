import { Router } from "express";
import { Appointment } from "../models/appointment.model";

export const router = Router();

router.post("/", async (req, res) => {
    try {
        const { clientName, phoneNumber, date, time, treatmentId } = req.body;

        if (!clientName || !phoneNumber || !date || !time || !treatmentId) {
            res.status(400).send("All fields required");
            return;
        }

        const newAppointment = await Appointment.create({ clientName, phoneNumber, date, time, treatmentId });
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error creating an appointment:", error);
        res.status(500).send("Server error");
    }
});

router.get("/", async (_, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("Server error");
    }  
});

router.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404).send("Appointment was not found");
            return;
        }

        res.json(appointment);
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).send("Server error");
    }
}); 

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);

        if (!deleted) {
            res.status(404).send("Appointment was not found");
            return;
        }

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).send("Server error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!updated) {
            res.status(404).send("Appointment was not found");
            return;
        }

        res.json(updated);
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).send("Server error");
    }
});