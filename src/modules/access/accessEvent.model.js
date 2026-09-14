import mongoose from "mongoose";

const accessEventSchema = new mongoose.Schema({
  estateId: { type: String, index: true },
  gateId: { type: String, index: true },
  registrationNumber: { type: String, required: true, uppercase: true, trim: true, index: true },
  direction: { type: String, enum: ["ENTRY", "EXIT"], required: true },
  source: { type: String, enum: ["ANPR", "MANUAL", "API"], default: "ANPR" },
  confidence: { type: Number, min: 0, max: 1 },
  decision: { type: String, enum: ["ALLOW", "HOLD", "DENY"], required: true },
  reason: { type: String, required: true },
  gateAction: { type: String, enum: ["OPEN", "HOLD", "CLOSED"], required: true },
  occurredAt: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

export default mongoose.models.AccessEvent || mongoose.model("AccessEvent", accessEventSchema);
