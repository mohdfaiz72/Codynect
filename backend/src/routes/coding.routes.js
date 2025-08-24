import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getProfiles,
  addProfile,
  fetchProfile,
  updateProfile,
  deleteProfile,
  getProfileById,
} from "../controllers/coding.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/refresh", fetchProfile);
router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.post("/", addProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

export default router;
