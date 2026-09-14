import jwt from "jsonwebtoken";
import User from "../modules/users/user.model.js";

function tokenSecret() {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured.");
  return process.env.JWT_SECRET;
}

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required." });

  try {
    const payload = jwt.verify(header.slice(7), tokenSecret());
    const user = await User.findById(payload.sub);
    if (!user || !user.active) return res.status(401).json({ error: "User is not active." });
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Invalid or expired authentication token." });
    }
    next(error);
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ error: "You do not have permission for this resource." });
    next();
  };
}
