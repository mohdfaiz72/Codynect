import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getUserProfileById,
} from "../controllers/network.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/get-users", getAllUsers);
router.get("/profile-view/:id", getUserProfileById);

export default router;
