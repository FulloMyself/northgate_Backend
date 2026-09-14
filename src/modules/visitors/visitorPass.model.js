import mongoose from "mongoose";

const visitorPassSchema = new mongoose.Schema({
  visitorName: { type: String, required: true, trim: true },
  visitorPhone: { type: String, trim: true },
  registrationNumber: { type: String, required: true, uppercase: true, trim: true },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  status: { type: String, enum: ["PENDING", "ACTIVE", "USED", "EXPIRED", "CANCELLED"], default: "ACTIVE" }
}, { timestamps: true });

export default mongoose.models.VisitorPass || mongoose.model("VisitorPass", visitorPassSchema);
