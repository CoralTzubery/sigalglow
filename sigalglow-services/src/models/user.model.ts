import { model, Schema } from "mongoose";

export type Role = "user" | "admin";

export type User = {
    username: string,
    password: string;
    role: Role;
};

const userSchema = new Schema<User>({
    username: { type: String, required: true, unigue: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ["user", "admin"], default: "user" }

});

export const UserModel = model("User", userSchema); 