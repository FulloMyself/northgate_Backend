export function notFound(_req, res) {
  res.status(404).json({ error: "Route not found." });
}

export function errorHandler(error, _req, res, _next) {
  console.error(error);
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: Object.values(error.errors).map((entry) => entry.message).join(" ")
    });
  }
  if (error.code === 11000) {
    return res.status(409).json({ error: "A record with one of these unique values already exists." });
  }
  res.status(error.statusCode || 500).json({
    error: error.statusCode ? error.message : "Internal server error."
  });
}
