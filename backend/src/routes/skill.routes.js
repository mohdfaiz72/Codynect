import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  getSkillsById,
} from "../controllers/skill.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getSkills);
router.post("/", addSkill);
router.patch("/:id", updateSkill);
router.delete("/:id", deleteSkill);
router.get("/:id", getSkillsById);

export default router;
