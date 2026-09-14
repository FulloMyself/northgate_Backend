import cors from "cors";
import express from "express";
import { authorize, requireAuth } from "./middleware/auth.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import accessRoutes from "./modules/access/access.routes.js";
import accessEventRoutes from "./modules/access/accessEvent.routes.js";
import auditLogRoutes from "./modules/audit/auditLog.routes.js";
import eventRoutes from "./modules/events/event.routes.js";
import estateRoutes from "./modules/estates/estate.routes.js";
import gateRoutes from "./modules/gates/gate.routes.js";
import healthRoutes from "./modules/health/health.routes.js";
import incidentRoutes from "./modules/incidents/incident.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import parkingBayRoutes from "./modules/parking/parkingBay.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import vehicleRoutes from "./modules/vehicles/vehicle.routes.js";
import visitorPassRoutes from "./modules/visitors/visitorPass.routes.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
  app.use(express.json({ limit: "1mb" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/health", healthRoutes);
  app.use("/api/access", requireAuth, authorize("SECURITY", "ADMIN", "SYSTEM_ADMIN"), accessRoutes);
  app.use("/api/access-events", requireAuth, authorize("SECURITY", "ADMIN", "SYSTEM_ADMIN"), accessEventRoutes);
  app.use("/api/audit", requireAuth, authorize("ADMIN", "SYSTEM_ADMIN"), auditLogRoutes);
  app.use("/api/events", requireAuth, eventRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/estates", requireAuth, authorize("ADMIN", "SYSTEM_ADMIN"), estateRoutes);
  app.use("/api/vehicles", requireAuth, vehicleRoutes);
  app.use("/api/visitors", requireAuth, visitorPassRoutes);
  app.use("/api/parking/bays", requireAuth, authorize("ADMIN", "SYSTEM_ADMIN"), parkingBayRoutes);
  app.use("/api/gates", requireAuth, authorize("SECURITY", "ADMIN", "SYSTEM_ADMIN"), gateRoutes);
  app.use("/api/incidents", requireAuth, authorize("SECURITY", "ADMIN", "SYSTEM_ADMIN"), incidentRoutes);
  app.use("/api/notifications", requireAuth, notificationRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
