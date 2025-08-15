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
router.post("/send-request", sendRequest);
router.post("/accept-request", acceptRequest);
router.delete("/reject-request", rejectRequest);
router.delete("/withdraw-request", withdrawRequest);
router.delete("/disconnect", disconnectConnection);
router.get("/profile-view/:id", getUserProfileById);

export default router;
