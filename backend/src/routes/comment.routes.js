import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addComment,
  getAllComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getAllComments);
router.post("/add", addComment);

export default router;
