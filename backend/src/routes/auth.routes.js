import express from "express";
import {
  login,
  register,
  logout,
  renewAccessToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/renew", renewAccessToken);
router.post("/logout", logout);

export default router;
