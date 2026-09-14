import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import Notification from "./notification.model.js";

const controller = createCrudController(Notification, { searchableFields: ["type", "title", "message"] });
const router = crudRoutes(Router(), controller);

export default router;
