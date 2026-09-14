import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, enum: ["ACCESS", "VISITOR", "SECURITY", "SYSTEM"], required: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  readAt: Date
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
