import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  updateProfileImage,
  updateCoverImage,
  updateUserDetails,
  getUserDetails,
  updateUserAbout,
  updateUserEducation,
  updateUserExperience,
  updateUserSkills,
  updateUserProjects,
  updateUserCertifications,
  updateUserLanguages,
  updateUserCodingProfiles,
} from "../controllers/user.controller.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.use(verifyJWT);

router.patch(
  "/update-profile-image",
  upload.single("file"),
  updateProfileImage
);
router.patch("/update-cover-image", upload.single("file"), updateCoverImage);
router.get("/get-details", getUserDetails);
router.patch("/update-details", updateUserDetails);
router.patch("/update-about", updateUserAbout);
router.patch("/update-education", updateUserEducation);
router.patch("/update-experience", updateUserExperience);
router.patch("/update-skills", updateUserSkills);
router.patch("/update-projects", updateUserProjects);
router.patch("/update-certifications", updateUserCertifications);
router.patch("/update-languages", updateUserLanguages);
router.patch("/update-coding-profiles", updateUserCodingProfiles);

export default router;
