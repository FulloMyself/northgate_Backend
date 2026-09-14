import mongoose from "mongoose";

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not configured; running in offline-ready mode");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log("MongoDB connected");
  } catch (error) {
    console.warn(`MongoDB unavailable; continuing in offline-ready mode: ${error.message}`);
  }
}

export function databaseStatus() {
  return mongoose.connection.readyState === 1 ? "connected" : "offline-ready";
}
