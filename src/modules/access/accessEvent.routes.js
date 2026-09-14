import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import AccessEvent from "./accessEvent.model.js";

const controller = createCrudController(AccessEvent, {
  searchableFields: ["registrationNumber", "decision", "reason", "gateId"]
});

export default crudRoutes(Router(), controller);
