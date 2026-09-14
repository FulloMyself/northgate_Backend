import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import Estate from "./estate.model.js";

const controller = createCrudController(Estate, { searchableFields: ["name", "code"] });
const router = crudRoutes(Router(), controller);

export default router;
