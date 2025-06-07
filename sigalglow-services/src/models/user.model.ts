import { createHash } from "crypto";
import { model, Schema } from "mongoose";

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

schema.pre("save", function (next) {
    const user = this as any;

    if (!user.isModified("password")) return next();

    if (!user.createdAt) {
        user.createdAt = new Date();
    }

    user.password = hashPasswordWithSalt(user.password, user.createdAt);
    next();
});


export const User = model("User", schema);

function hashPasswordWithSalt(password: string, salt: Date) {
    const hash = createHash("sha512");

    hash.update(password);
    hash.update(salt.valueOf().toString());

    return hash.digest("base64");
}