const events = [
  { plate: "7 XKA 441", detail: "Bay A-04", status: "ALLOWED", direction: "ENTRY", source: "resident", createdAt: new Date().toISOString() },
  { plate: "KLM 209", detail: "Guest · pre-auth", status: "ALLOWED", direction: "ENTRY", source: "visitor", createdAt: new Date(Date.now() - 180000).toISOString() },
  { plate: "DQX 883", detail: "Not on list", status: "HELD", direction: "ENTRY", source: "unknown", createdAt: new Date(Date.now() - 360000).toISOString() },
  { plate: "7 XKA 441", detail: "Bay A-04", status: "ALLOWED", direction: "EXIT", source: "resident", createdAt: new Date(Date.now() - 540000).toISOString() }
];

export function listEvents(limit = 20) {
  return events.slice(0, limit);
}

export function saveEvent(event) {
  events.unshift(event);
  return event;
}
