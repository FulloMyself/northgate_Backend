import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import ParkingBay from "./parkingBay.model.js";

const controller = createCrudController(ParkingBay, { searchableFields: ["code", "type", "status"] });
const router = crudRoutes(Router(), controller);

export default router;
