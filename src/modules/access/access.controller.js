import { evaluateAccess } from "./access.service.js";

export function decideAccess(req, res) {
  res.status(201).json(evaluateAccess(req.body));
}
