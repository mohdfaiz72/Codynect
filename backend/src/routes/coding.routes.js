import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getProfiles,
  addProfile,
  fetchProfile,
  updateProfile,
  getCodingProfile,
  deleteProfile,
} from "../controllers/coding.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/get-profile", getProfiles);
router.get("/get-profile/:id", getCodingProfile);
router.post("/add-profile", addProfile);
router.post("/fetch-profile", fetchProfile);
router.delete("/delete-profile/:id", deleteProfile);
router.post("/update-profile/:id", updateProfile);

export default router;
