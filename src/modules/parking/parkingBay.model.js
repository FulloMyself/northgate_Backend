import mongoose from "mongoose";

const parkingBaySchema = new mongoose.Schema({
  estateId: { type: mongoose.Schema.Types.ObjectId, ref: "Estate", required: true, index: true },
  code: { type: String, required: true, trim: true },
  type: { type: String, enum: ["RESIDENT", "VISITOR", "DISABLED", "SERVICE"], default: "RESIDENT" },
  assignedVehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  status: { type: String, enum: ["AVAILABLE", "OCCUPIED", "CLOSED"], default: "AVAILABLE" }
}, { timestamps: true });

parkingBaySchema.index({ estateId: 1, code: 1 }, { unique: true });

export default mongoose.models.ParkingBay || mongoose.model("ParkingBay", parkingBaySchema);
