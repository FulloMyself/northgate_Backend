import { Router } from "express";
import { getEvents } from "./event.controller.js";

const router = Router();
router.get("/", getEvents);

export default router;
