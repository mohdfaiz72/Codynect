import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getContests,
  getTechNews,
} from "../controllers/external.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/contests", getContests);
router.get("/tech-news", getTechNews);

export default router;
