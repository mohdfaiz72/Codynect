import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getProfiles,
  addProfile,
  fetchProfile,
  updateProfile,
} from "../controllers/coding.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/get-profile", getProfiles);
router.post("/add-profile", addProfile);
router.post("/fetch-profile", fetchProfile);
router.post("/update-profile/:id", updateProfile);

export default router;
