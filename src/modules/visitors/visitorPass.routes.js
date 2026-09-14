import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import VisitorPass from "./visitorPass.model.js";

const controller = createCrudController(VisitorPass, { searchableFields: ["visitorName", "registrationNumber", "status"] });
const router = crudRoutes(Router(), controller);

export default router;
