import { Router } from "express";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import AuditLog from "./auditLog.model.js";

const controller = createCrudController(AuditLog, {
  searchableFields: ["action", "resourceType", "resourceId"]
});

export default crudRoutes(Router(), controller);
