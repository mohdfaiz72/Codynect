import express from "express";
import { addComment } from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);

export default router;
