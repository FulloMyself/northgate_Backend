import { Router } from "express";
import mongoose from "mongoose";
import { crudRoutes, createCrudController } from "../../shared/crud.js";
import User from "../users/user.model.js";
import VisitorPass from "./visitorPass.model.js";

async function resolveResidentId(value) {
  if (!value) return value;
  if (mongoose.isValidObjectId(value)) return value;

  const normalized = String(value).trim();
  const user = await User.findOne({
    $or: [
      { email: normalized.toLowerCase() },
      { idNumber: normalized.replace(/\s/g, "") }
    ],
    role: "RESIDENT"
  }).select("_id");

  if (!user) {
    const error = new Error("Resident ID must be a resident MongoDB ID, email address, or 13-digit South African ID number.");
    error.statusCode = 400;
    throw error;
  }
  return user._id;
}

function normalizeRegistrationNumber(value) {
  return typeof value === "string" ? value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : value;
}

const controller = createCrudController(VisitorPass, { searchableFields: ["visitorName", "registrationNumber", "status"] });
const create = controller.create;
const update = controller.update;
controller.create = async (req, res) => {
  req.body.residentId = await resolveResidentId(req.body.residentId);
  req.body.registrationNumber = normalizeRegistrationNumber(req.body.registrationNumber);
  return create(req, res);
};
controller.update = async (req, res) => {
  if (req.body.residentId) req.body.residentId = await resolveResidentId(req.body.residentId);
  if (req.body.registrationNumber) req.body.registrationNumber = normalizeRegistrationNumber(req.body.registrationNumber);
  return update(req, res);
};

const router = crudRoutes(Router(), controller);

export default router;
