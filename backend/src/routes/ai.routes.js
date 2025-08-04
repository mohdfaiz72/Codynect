// routes/ai.routes.js
import express from "express";
import { getRandomFact, enhanceAbout } from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/random-fact", getRandomFact);
router.post("/enhance-about", enhanceAbout);

export default router;
