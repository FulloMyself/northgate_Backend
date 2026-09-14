import mongoose from "mongoose";
import { asyncHandler } from "../middleware/asyncHandler.js";

function assertObjectId(id) {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("Invalid resource id.");
    error.statusCode = 400;
    throw error;
  }
}

export function createCrudController(Model, { searchableFields = [] } = {}) {
  return {
    list: async (req, res) => {
      const filter = {};
      if (req.query.search && searchableFields.length) {
        const search = String(req.query.search).trim();
        filter.$or = searchableFields.map((field) => ({ [field]: { $regex: search, $options: "i" } }));
      }

      const documents = await Model.find(filter).sort({ createdAt: -1 }).limit(100);
      res.json(documents);
    },

    get: async (req, res) => {
      assertObjectId(req.params.id);
      const document = await Model.findById(req.params.id);
      if (!document) return res.status(404).json({ error: "Resource not found." });
      res.json(document);
    },

    create: async (req, res) => {
      const document = await Model.create(req.body);
      res.status(201).json(document);
    },

    update: async (req, res) => {
      assertObjectId(req.params.id);
      const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!document) return res.status(404).json({ error: "Resource not found." });
      res.json(document);
    },

    remove: async (req, res) => {
      assertObjectId(req.params.id);
      const document = await Model.findByIdAndDelete(req.params.id);
      if (!document) return res.status(404).json({ error: "Resource not found." });
      res.status(204).send();
    }
  };
}

export function crudRoutes(router, controller) {
  router.get("/", asyncHandler(controller.list));
  router.get("/:id", asyncHandler(controller.get));
  router.post("/", asyncHandler(controller.create));
  router.patch("/:id", asyncHandler(controller.update));
  router.delete("/:id", asyncHandler(controller.remove));
  return router;
}
