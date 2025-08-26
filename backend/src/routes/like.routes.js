import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleLike } from "../controllers/like.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/toggle", toggleLike);

export default router;
