import express from "express";
import {
  getMessages,
  sendMessage,
  getConversations,
  getConversationById,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/conversations", getConversations);
router.get("/:partnerId", getConversationById);
router.get("/get-message/:receiverId", getMessages);
router.post("/send/:receiverId", sendMessage);

export default router;
