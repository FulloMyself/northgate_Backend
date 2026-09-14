import { Router } from "express";
import { databaseStatus } from "../../config/database.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ status: "ok", service: "northgate-api", database: databaseStatus() });
});

export default router;
