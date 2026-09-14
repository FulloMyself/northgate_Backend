import mongoose from "mongoose";

function normalizeRegistrationNumber(value) {
  return typeof value === "string" ? value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : value;
}

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    set: normalizeRegistrationNumber,
    unique: true,
    match: /^[A-Z0-9]{1,10}$/
  },
  vehicleType: { type: String, enum: ["RESIDENT", "PERMANENT", "TEMPORARY", "SERVICE"], default: "RESIDENT" },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bayId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingBay" },
  active: { type: Boolean, default: true },
  blocked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
