import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import Vehicle from "./vehicle.model.js";

const controller = createCrudController(Vehicle, { searchableFields: ["registrationNumber", "vehicleType"] });
const router = crudRoutes(Router(), controller);

export default router;
