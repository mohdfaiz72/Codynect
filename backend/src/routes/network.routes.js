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

router.get("/get-users", getAllUsers);
router.post("/send-request", verifyJWT, sendRequest);
router.post("/accept-request", verifyJWT, acceptRequest);
router.delete("/reject-request", verifyJWT, rejectRequest);
router.delete("/withdraw-request", verifyJWT, withdrawRequest);
router.delete("/disconnect", verifyJWT, disconnectConnection);
router.get("/profile-view/:id", getUserProfileById);

export default router;
