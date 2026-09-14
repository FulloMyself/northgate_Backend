import mongoose from "mongoose";

const gateSchema = new mongoose.Schema({
  estateId: { type: mongoose.Schema.Types.ObjectId, ref: "Estate", required: true, index: true },
  name: { type: String, required: true, trim: true },
  direction: { type: String, enum: ["ENTRY", "EXIT", "BOTH"], default: "BOTH" },
  status: { type: String, enum: ["ONLINE", "OFFLINE", "FAULT"], default: "OFFLINE" },
  controllerId: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.models.Gate || mongoose.model("Gate", gateSchema);
