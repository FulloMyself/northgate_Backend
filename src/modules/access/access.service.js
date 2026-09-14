import { saveEvent } from "../events/event.store.js";

const knownVehicles = new Map([
  ["7 XKA 441", { detail: "Bay A-04", source: "resident", reason: "ACTIVE_RESIDENT_VEHICLE" }],
  ["KLM 209", { detail: "Guest · pre-auth", source: "visitor", reason: "VALID_VISITOR_PASS" }],
  ["BRV 512", { detail: "Bay C-11", source: "resident", reason: "ACTIVE_RESIDENT_VEHICLE" }]
]);

export function evaluateAccess(input) {
  const plate = String(input.registrationNumber || input.plate || "").trim().toUpperCase();
  const vehicle = knownVehicles.get(plate);
  const allowed = Boolean(vehicle);
  const direction = String(input.direction || "ENTRY").trim().toUpperCase();
  const event = {
    plate,
    detail: vehicle?.detail || "Not on list",
    status: allowed ? "ALLOWED" : "HELD",
    direction,
    source: vehicle?.source || "unknown",
    createdAt: new Date().toISOString()
  };

  saveEvent(event);
  return {
    ...event,
    decision: allowed ? "ALLOW" : "HOLD",
    reason: vehicle?.reason || "UNKNOWN_VEHICLE",
    gateAction: allowed ? "OPEN" : "HOLD"
  };
}
