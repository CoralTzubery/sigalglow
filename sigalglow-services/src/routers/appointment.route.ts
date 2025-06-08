import { Router } from "express";
import * as controller from "../controllers/appointment.controller";

export const router = Router();

router.get("/", controller.getAll);
router.post("/", controller.create);