import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  getEducationById,
} from "../controllers/education.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getEducation);
router.post("/", addEducation);
router.patch("/:id", updateEducation);
router.delete("/:id", deleteEducation);
router.get("/:id", getEducationById);

export default router;
