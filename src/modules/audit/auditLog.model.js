import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true, trim: true },
  resourceType: { type: String, required: true, trim: true },
  resourceId: { type: String, trim: true },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  occurredAt: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

export default mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);
