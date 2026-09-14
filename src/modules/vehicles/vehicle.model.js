import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, uppercase: true, trim: true, unique: true, match: /^[A-Z0-9]{1,10}$/ },
  vehicleType: { type: String, enum: ["RESIDENT", "PERMANENT", "TEMPORARY", "SERVICE"], default: "RESIDENT" },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bayId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingBay" },
  active: { type: Boolean, default: true },
  blocked: { type: Boolean, default: false }
}, { timestamps: true });

vehicleSchema.pre("validate", function normalizePlate(next) {
  if (this.registrationNumber) this.registrationNumber = this.registrationNumber.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  next();
});

export default mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
