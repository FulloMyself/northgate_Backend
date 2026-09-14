import "dotenv/config";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT || 5000);
const app = createApp();

connectDatabase().finally(() => {
  app.listen(port, () => console.log(`Northgate API listening on http://localhost:${port}`));
});
