import { Application, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { User } from "./models/user.model";

export function useAuth(app: Application) {
    app.post("/register", register);
    app.post("/login", login);

    // app.use(
    //     expressjwt({
    //         algorithms: ["HS256"],
    //         secret: process.env.SESSION_SECRET!,
    //     })
    // );
}

function createToken(userId: string, userName: string, role: "admin" | "client") {
    return jwt.sign({ sub: userId, userName, role }, process.env.SESSION_SECRET!, { expiresIn: 60*10 });
}

const register: RequestHandler = async (req, res) => {
    try {
        const { email, fullName, password, phoneNumber } = req.body;
        if (!email || !fullName || !password || !phoneNumber) {
            res.status(400).send("All field are required");
            return;
        }

        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            res.status(409).send(`User with the email ${email} already exits`);
            return;
        }

        const newUser = await User.create({ email, password, fullName, phoneNumber, role: "client" });
        res.json({ token: createToken(newUser.id, newUser.fullName, newUser.role) });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).end();
    }
};

const login: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send("Email and password are required");
            return;
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !user.isSamePassword(password)) {
            res.status(401).send("Invalid credentials");
            return;
        }

        res.json({token: createToken(user.id, user.fullName, user.role)});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).end();
    }
};