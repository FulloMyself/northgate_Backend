import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  estateId: { type: mongoose.Schema.Types.ObjectId, ref: "Estate", required: true, index: true },
  type: { type: String, enum: ["UNKNOWN_VEHICLE", "GATE_FAULT", "CAMERA_FAULT", "SECURITY"], required: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ["OPEN", "INVESTIGATING", "RESOLVED"], default: "OPEN" },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resolvedAt: Date
}, { timestamps: true });

export default mongoose.models.Incident || mongoose.model("Incident", incidentSchema);
