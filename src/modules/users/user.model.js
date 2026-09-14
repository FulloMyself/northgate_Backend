import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  idNumber: { type: String, required: true, unique: true, match: /^\d{13}$/ },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["RESIDENT", "VISITOR", "SECURITY", "ADMIN", "SYSTEM_ADMIN"], default: "RESIDENT" },
  active: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre("validate", function normalizeIdentity(next) {
  if (this.idNumber) this.idNumber = this.idNumber.replace(/\s/g, "");
  if (this.email) this.email = this.email.toLowerCase().trim();
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
