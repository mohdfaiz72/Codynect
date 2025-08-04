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

router.get("/get-details", verifyJWT, getUserDetails);

router.patch(
  "/update-profile-image",
  verifyJWT,
  upload.single("file"),
  updateProfileImage
);

router.patch(
  "/update-cover-image",
  verifyJWT,
  upload.single("file"),
  updateCoverImage
);

router.patch("/update-details", verifyJWT, updateUserDetails);
router.patch("/update-about", verifyJWT, updateUserAbout);
router.patch("/update-educations", verifyJWT, updateUserEducation);
router.patch("/update-experiences", verifyJWT, updateUserExperience);
router.patch("/update-skills", verifyJWT, updateUserSkills);
router.patch("/update-projects", verifyJWT, updateUserProjects);
router.patch("/update-certifications", verifyJWT, updateUserCertifications);
router.patch("/update-languages", verifyJWT, updateUserLanguages);
router.patch("/update-coding-profiles", verifyJWT, updateUserCodingProfiles);

export default router;
