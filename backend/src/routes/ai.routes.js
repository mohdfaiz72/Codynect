// routes/ai.routes.js
import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getRandomFact,
  getEnhanceAbout,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/random-fact", getRandomFact);
router.post("/enhance-about", getEnhanceAbout);

export default router;
