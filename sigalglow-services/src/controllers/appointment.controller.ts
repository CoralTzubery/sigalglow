import { RequestHandler } from "express";
import { Appointment } from "../models/appointment.model";

export const getAll: RequestHandler = async (_, res) => {
    const appointmets = await Appointment.find();
    res.json(appointmets);
};

export const create: RequestHandler = async (req, res) => {
    const { clientName, phoneNumber, date, time, treatmentId } = req.body;

    if (!clientName || !phoneNumber || !date || !time || !treatmentId) {
        res.status(400).send("All fields are required");
        return;
    }

    const newAppointment = await Appointment.create({ clientName, phoneNumber, date, time, treatmentId });
    res.status(201).json(newAppointment);
};