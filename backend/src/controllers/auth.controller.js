import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// --------------- Generate tokens ----------------
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw Error(
      "Something went wrong while generating refresh and access token."
    );
  }
};

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    const { password: _, refreshToken: __, ...userData } = user._doc;
    const options = {
      httpOnly: true,
      secure: false,
    };
    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Registered successfully",
        user: userData,
        accessToken,
        refreshToken,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    const { password: _, refreshToken: __, ...userData } = user._doc;
    const options = {
      httpOnly: true,
      secure: false,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Logged In successfully",
        user: userData,
        accessToken,
        refreshToken,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- LOGOUT ----------------
export const logout = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: "",
        },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: false,
    };
    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
