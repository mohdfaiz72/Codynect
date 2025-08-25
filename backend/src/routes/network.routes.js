import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  sendRequest,
  acceptRequest,
  rejectRequest,
  withdrawRequest,
  getUserProfileById,
  disconnectConnection,
} from "../controllers/network.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getAllUsers);
router.post("/send", sendRequest);
router.post("/accept", acceptRequest);
router.delete("/reject", rejectRequest);
router.delete("/withdraw", withdrawRequest);
router.delete("/disconnect", disconnectConnection);
router.get("/profile-view/:id", getUserProfileById);

export default router;
