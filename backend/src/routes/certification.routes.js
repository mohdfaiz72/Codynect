import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
  getCertificationsById,
} from "../controllers/certification.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getCertifications);
router.post("/", addCertification);
router.patch("/:id", updateCertification);
router.delete("/:id", deleteCertification);
router.get("/:id", getCertificationsById);

export default router;
