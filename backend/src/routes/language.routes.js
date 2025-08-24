import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getLanguages,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguagesById,
} from "../controllers/language.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getLanguages);
router.post("/", addLanguage);
router.patch("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);
router.get("/:id", getLanguagesById);

export default router;
