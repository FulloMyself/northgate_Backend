import mongoose from "mongoose";

const estateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, uppercase: true, trim: true, unique: true },
  timezone: { type: String, default: "Africa/Johannesburg" },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Estate || mongoose.model("Estate", estateSchema);
