import express from "express";
import cors from "cors";
import { router as aboutRouter}  from "./routers/about.route";
import { useAuth } from "./auth";

export const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(express.json());

app.use(express.static("public"));

useAuth(app);

app.use("/api/about", aboutRouter);