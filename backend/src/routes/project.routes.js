import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getProjectsById,
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getProjects);
router.post("/", addProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProjectsById);

export default router;
