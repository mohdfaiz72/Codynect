import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: false, // set true in production
  sameSite: "strict",
};

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ error: "Name, email, and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    const { password: _, refreshToken: __, ...userData } = user._doc;

    return res
      .status(201)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        message: "Registered successfully",
        accessToken,
        user: userData,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+refreshToken");
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await user.isPasswordCorrect(password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    const { password: _, refreshToken: __, ...userData } = user._doc;

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({ message: "Logged in successfully", accessToken, user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- LOGOUT ----------------
export const logout = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (userId) await User.findByIdAndUpdate(userId, { refreshToken: "" });

    return res
      .clearCookie("refreshToken", cookieOptions)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- RENEW ACCESS TOKEN ----------------
export const renewAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });

    const accessToken = user.generateAccessToken();

    const { password: _, refreshToken: __, ...userData } = user._doc;

    return res.status(200).json({ accessToken, user: userData });
  } catch (err) {
    return res
      .status(401)
      .json({ message: err.message || "Could not refresh token" });
  }
};
