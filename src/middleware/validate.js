export function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter((field) => {
      const value = req.body?.[field];
      return value === undefined || value === null || String(value).trim() === "";
    });

    if (missing.length) {
      return res.status(400).json({ error: `Missing required field(s): ${missing.join(", ")}.` });
    }

    next();
  };
}
