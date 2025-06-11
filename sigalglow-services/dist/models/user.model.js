"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
    role: {
        type: String,
        enum: ["client", "admin"],
        default: "client",
    }
}, {
    timestamps: true,
    methods: {
        isSamePassword(password) {
            const hash = hashPasswordWithSalt(password, this.get("createdAt"));
            return this.password === hash;
        },
    }
});
schema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    if (!user.createdAt) {
        user.createdAt = new Date();
    }
    user.password = hashPasswordWithSalt(user.password, user.createdAt);
    next();
});
exports.User = (0, mongoose_1.model)("User", schema);
function hashPasswordWithSalt(password, salt) {
    const hash = (0, crypto_1.createHash)("sha512");
    hash.update(password);
    hash.update(salt.valueOf().toString());
    return hash.digest("base64");
}
