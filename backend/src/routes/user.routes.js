import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  updateProfileImage,
  updateCoverImage,
  updateUserDetails,
  getUserDetails,
  updateUserAbout,
  getUserDetailsById,
} from "../controllers/user.controller.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.use(verifyJWT);

router.patch("/profile-image", upload.single("file"), updateProfileImage);
router.patch("/cover-image", upload.single("file"), updateCoverImage);
router.get("/", getUserDetails);
router.patch("/details", updateUserDetails);
router.patch("/about", updateUserAbout);
router.get("/:id", getUserDetailsById);

export default router;
