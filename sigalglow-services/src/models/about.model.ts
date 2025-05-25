import { Schema, model } from "mongoose";

const AboutSchema = new Schema({
    id: String,
    title: String,
    content: String,
});

export const About = model("About", AboutSchema);