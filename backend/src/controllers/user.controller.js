import User from "../models/user.model.js";
import ProfileView from "../models/profileview.model.js";

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user._id;
    if (req.body.remove === "true") {
      const user = await User.findByIdAndUpdate(
        userId,
        { profileImage: "" },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      return res
        .status(200)
        .json({ message: "Profile image removed successfully.", user });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file was provided." });
    }

    const imageUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .status(200)
      .json({ message: "Profile image updated successfully.", user });
  } catch (err) {
    console.error("Update profile image error:", err);
    res.status(500).json({ error: "An unexpected server error occurred." });
  }
};

export const updateCoverImage = async (req, res) => {
  try {
    const userId = req.user._id;
    if (req.body.remove === "true") {
      const user = await User.findByIdAndUpdate(
        userId,
        { coverImage: "" },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      return res
        .status(200)
        .json({ message: "Cover image removed successfully.", user });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No cover image file provided." });
    }

    const imageUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      userId,
      { coverImage: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .status(200)
      .json({ message: "Cover image updated successfully.", user });
  } catch (err) {
    console.error("Update cover image error:", err);
    res.status(500).json({ error: "An unexpected server error occurred." });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, headline, address } = req.body;

    if (!name || !headline || !address || typeof address !== "object")
      return res.status(400).json({ error: "Missing or invalid fields." });

    const user = await User.findByIdAndUpdate(
      userId,
      { name, headline, address },
      { new: true }
    ).select("-password");

    res.json({ message: "User details updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserAbout = async (req, res) => {
  try {
    const userId = req.user._id;
    const { about } = req.body;
    const user = await User.findByIdAndUpdate(userId, { about }, { new: true });

    res.status(200).json({
      message: "about section updated successfully.",
      user,
    });
  } catch (err) {
    console.error("Error updating user about section:", err);
    res.status(500).json({
      message: "Server error while updating profile.",
      error: err.message,
    });
  }
};

export const getUserDetailsById = async (req, res) => {
  try {
    const { id: viewedId } = req.params;
    const { _id: viewerId } = req.user;

    const user = await User.findById(viewedId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const existingView = await ProfileView.findOne({
      viewer: viewerId,
      viewed: viewedId,
    });

    if (existingView) {
      existingView.updatedAt = new Date();
      await existingView.save();
    } else {
      await ProfileView.create({ viewer: viewerId, viewed: viewedId });
      user.profileViews = (user.profileViews || 0) + 1;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user or updating profile view:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
