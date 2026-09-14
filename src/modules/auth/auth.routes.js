import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import User from "../users/user.model.js";

const router = Router();

function issueToken(user) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured.");
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, idNumber: user.idNumber, email: user.email, role: user.role };
}

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: "Invalid email or password." });
    res.json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) { next(error); }
});

router.post("/staff", async (req, res, next) => {
  try {
    if (!process.env.OWNER_SETUP_KEY || req.headers["x-owner-key"] !== process.env.OWNER_SETUP_KEY) return res.status(403).json({ error: "Owner setup key required." });
    const { name, idNumber, email, password, role } = req.body;
    if (!name || !idNumber || !email || !password || !["SECURITY", "ADMIN", "SYSTEM_ADMIN"].includes(role)) return res.status(400).json({ error: "Name, ID number, email, password and a valid staff role are required." });
    if (!/^\d{13}$/.test(String(idNumber).replace(/\s/g, ""))) return res.status(400).json({ error: "ID number must contain exactly 13 digits." });
    const user = await User.create({ name, idNumber: req.body.idNumber, email, role, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.get("/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

export default router;
