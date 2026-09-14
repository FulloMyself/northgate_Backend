import bcrypt from "bcryptjs";
import User from "./user.model.js";

const STAFF_ROLES = ["SECURITY", "ADMIN", "SYSTEM_ADMIN"];
const ASSIGNABLE_ROLES = ["RESIDENT", "SECURITY"];

export async function createUser(req, res) {
  const { name, idNumber, email, password, role } = req.body;
  if (!name || !idNumber || !email || !password || !role) {
    return res.status(400).json({ error: "Name, South African ID number, email, password and role are required." });
  }
  if (!/^\d{13}$/.test(String(idNumber).replace(/\s/g, ""))) {
    return res.status(400).json({ error: "ID number must contain exactly 13 digits." });
  }
  if (req.user.role === "ADMIN" && !ASSIGNABLE_ROLES.includes(role)) {
    return res.status(403).json({ error: "Admins may create Resident and Security accounts only." });
  }
  if (req.user.role === "SYSTEM_ADMIN" && ![...ASSIGNABLE_ROLES, "ADMIN"].includes(role)) {
    return res.status(403).json({ error: "This role cannot be created from this console." });
  }
  const user = await User.create({
    name, idNumber: String(idNumber).replace(/\s/g, ""), email, role,
    passwordHash: await bcrypt.hash(password, 12)
  });
  res.status(201).json({ id: user._id, name: user.name, idNumber: user.idNumber, email: user.email, role: user.role });
}

export async function updateProfile(req, res) {
  const { email, password, currentPassword } = req.body;
  const user = await User.findById(req.user._id).select("+passwordHash");
  if (!user) return res.status(404).json({ error: "User not found." });
  if (password) {
    if (!currentPassword || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      return res.status(400).json({ error: "Current password is required to set a new password." });
    }
    if (password.length < 8) return res.status(400).json({ error: "New password must be at least 8 characters." });
    user.passwordHash = await bcrypt.hash(password, 12);
  }
  if (email) user.email = email;
  await user.save();
  res.json({ id: user._id, name: user.name, idNumber: user.idNumber, email: user.email, role: user.role });
}
