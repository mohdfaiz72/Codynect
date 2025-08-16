import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  postJob,
  getFeed,
  postPoll,
  postDoubt,
  postArticle,
  postThought,
  postSnippet,
  postShowcase,
  postAchievement,
} from "../controllers/post.controller.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/get-feed", getFeed);
router.post("/thought", upload.single("file"), postThought);
router.post("/achievement", upload.single("file"), postAchievement);
router.post("/article", upload.single("file"), postArticle);
router.post("/snippet", postSnippet);
router.post("/showcase", postShowcase);
router.post("/doubt", postDoubt);
router.post("/poll", postPoll);
router.post("/job", postJob);

export default router;
