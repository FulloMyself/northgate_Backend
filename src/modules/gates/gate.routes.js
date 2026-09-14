import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import Gate from "./gate.model.js";

const controller = createCrudController(Gate, { searchableFields: ["name", "status", "controllerId"] });
const router = crudRoutes(Router(), controller);

export default router;
