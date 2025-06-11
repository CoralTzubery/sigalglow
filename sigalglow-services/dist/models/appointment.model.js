"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    clientName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    treatmentId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Appointment = (0, mongoose_1.model)("Appointment", schema);
