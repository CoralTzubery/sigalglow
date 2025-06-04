import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aboutRouter from "./routers/about.route";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://loacalhost:5173",
    credentials: true,
}));
app.use(express.json());

app.use("/api/about", aboutRouter);

export default app;