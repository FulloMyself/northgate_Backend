import { Router } from "express";
import { requireFields } from "../../middleware/validate.js";
import { decideAccess } from "./access.controller.js";

const router = Router();

router.post("/decide", requireFields(["plate"]), decideAccess);
router.post("/evaluate", requireFields(["registrationNumber"]), decideAccess);

export default router;
