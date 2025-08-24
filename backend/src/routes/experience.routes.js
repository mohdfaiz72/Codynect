import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getExperienceById,
} from "../controllers/experience.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getExperience);
router.post("/", addExperience);
router.patch("/:id", updateExperience);
router.delete("/:id", deleteExperience);
router.get("/:id", getExperienceById);

export default router;
