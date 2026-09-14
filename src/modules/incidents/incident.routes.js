import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import Incident from "./incident.model.js";

const controller = createCrudController(Incident, { searchableFields: ["type", "description", "status"] });
const router = crudRoutes(Router(), controller);

export default router;
