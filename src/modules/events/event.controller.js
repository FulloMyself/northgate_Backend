import { listEvents } from "./event.store.js";

export function getEvents(req, res) {
  const requestedLimit = Number(req.query.limit || 20);
  const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 20;
  res.json(listEvents(limit));
}
