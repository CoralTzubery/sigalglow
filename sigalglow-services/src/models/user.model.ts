import { createHash } from "crypto";
import { Document, model, Schema } from "mongoose";

export type UserRole = "client" | "admin";

export type User = {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    role: UserRole;
};

const schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        set(newPassword: string) {
            if (!(this instanceof Document) || this.isNew) {
                throw new Error();
            }

            return hashPasswordWithSalt(newPassword, this.get("createdAt"));
        },
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role:
    {
        type: String,
        enum: ["client", "admin"],
        default: "client",
    }
}, {
    timestamps: true,
    methods: {
        isSamePassword(password: string) {
            const hash = hashPasswordWithSalt(password, this.get("createdAt"));
            return this.password === hash;
        },
    }
});

export const User = model("User", schema);

function hashPasswordWithSalt(password: string, salt: Date) {
    const hash = createHash("sha512");

    hash.update(password);
    hash.update(salt.valueOf().toString());

    return hash.digest("base64");
}