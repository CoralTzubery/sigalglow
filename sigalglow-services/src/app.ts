import express from "express";
import cors from "cors";
import { useAuth } from "./auth";
import { router as aboutRouter}  from "./routers/about.route";
import { router as appointmentRouter } from "./routers/appointment.route";
import { router as reviewRouter } from "./routers/review.route";
import { router as contactRouter } from "./routers/contact.route";

export const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://sigalglow.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
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
app.use("/api/appointments", appointmentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/contact", contactRouter);