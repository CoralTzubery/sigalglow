import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aboutRouter from "./routers/about.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/about", aboutRouter);

export default app;