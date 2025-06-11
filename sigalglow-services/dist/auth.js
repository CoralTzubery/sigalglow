"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = useAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("./models/user.model");
function useAuth(app) {
    app.post("/register", register);
    app.post("/login", login);
    // app.use(
    //     expressjwt({
    //         algorithms: ["HS256"],
    //         secret: process.env.SESSION_SECRET!,
    //     })
    // );
}
function createToken(userId, userName, email, phoneNumber, role) {
    return jsonwebtoken_1.default.sign({ sub: userId, userName, email, phoneNumber, role }, process.env.SESSION_SECRET, { expiresIn: 60 * 10 });
}
const register = async (req, res) => {
    try {
        const { email, fullName, password, phoneNumber } = req.body;
        if (!email || !fullName || !password || !phoneNumber) {
            res.status(400).send("All field are required");
            return;
        }
        const exisitingUser = await user_model_1.User.findOne({ email });
        if (exisitingUser) {
            res.status(409).send(`User with the email ${email} already exits`);
            return;
        }
        const newUser = await user_model_1.User.create({ email, password, fullName, phoneNumber, role: "client" });
        res.json({ token: createToken(newUser.id, newUser.fullName, newUser.email, newUser.phoneNumber, newUser.role) });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).end();
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("Email and password are required");
            return;
        }
        const user = await user_model_1.User.findOne({ email }).select("+password");
        if (!user || !user.isSamePassword(password)) {
            res.status(401).send("Invalid credentials");
            return;
        }
        res.json({ token: createToken(user.id, user.fullName, user.email, user.phoneNumber, user.role) });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).end();
    }
};
