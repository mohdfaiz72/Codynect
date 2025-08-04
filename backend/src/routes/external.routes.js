import express from "express";
import {
  getContests,
  getTechNews,
} from "../controllers/external.controller.js";

const router = express.Router();

router.get("/contests", getContests);
router.get("/tech-news", getTechNews);

export default router;
