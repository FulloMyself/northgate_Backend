import { Router } from "express";
import { authorize, requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import User from "./user.model.js";
import { createUser, updateProfile } from "./user.controller.js";

const router = Router();
const controller = createCrudController(User, { searchableFields: ["name", "email", "idNumber"] });

controller.update = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "Resource not found." });
  if (req.body.email !== undefined) user.email = req.body.email;
  if (req.body.active !== undefined) user.active = req.body.active;
  if (req.body.role !== undefined && req.user.role === "SYSTEM_ADMIN") user.role = req.body.role;
  await user.save();
  res.json({ id: user._id, name: user.name, idNumber: user.idNumber, email: user.email, role: user.role, active: user.active });
};

router.post("/", requireAuth, authorize("ADMIN", "SYSTEM_ADMIN"), asyncHandler(createUser));
router.patch("/profile", requireAuth, asyncHandler(updateProfile));
router.use(requireAuth, authorize("ADMIN", "SYSTEM_ADMIN"));
crudRoutes(router, controller);

export default router;
