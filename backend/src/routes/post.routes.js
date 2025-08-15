import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getFeed,
  postPoll,
  postThought,
  postSnippet,
  postShowcase,
} from "../controllers/post.controller.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/get-feed", getFeed);
router.post("/thought", upload.single("file"), postThought);
router.post("/snippet", postSnippet);
router.post("/showcase", postShowcase);
router.post("/poll", postPoll);

export default router;
