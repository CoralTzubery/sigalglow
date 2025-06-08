import { model, Schema } from "mongoose";

export type Appointment = {
    clientName: string;
    phoneNumber: string;
    date: string;
    time: string;
    treatmentId: string;
};

const schema = new Schema<Appointment>({
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
},
{
    timestamps: true,
}
);

export const Appointment = model("Appointment", schema);