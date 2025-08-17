import CodingProfile from "../models/codingprofile.model.js";
import {
  fetchLeetCodeData,
  fetchCodeforcesData,
} from "../services/codingProfile.service.js";

export const getProfiles = async (req, res) => {
  try {
    const { userId } = req;
    const profiles = await CodingProfile.find({ user: userId });
    res.status(200).json(profiles);
  } catch (err) {
    console.error("Error fetching coding profiles:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const addProfile = async (req, res) => {
  try {
    const { platform, username } = req.body;
    const { userId } = req;
    if (!platform || !username) {
      return res
        .status(400)
        .json({ message: "Platform and username are required." });
    }

    const existingProfile = await CodingProfile.findOne({
      user: userId,
      platform,
      username,
    });
    if (existingProfile) {
      return res
        .status(409)
        .json({ message: "This coding profile already exists." });
    }

    const newProfile = await CodingProfile.create({
      user: userId,
      platform,
      username,
    });

    res.status(201).json(newProfile);
  } catch (err) {
    console.error("Error adding coding profile:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const fetchProfile = async (req, res) => {
  try {
    const { platform, username } = req.body;
    const { userId } = req;
    if (!platform || !username) {
      return res
        .status(400)
        .json({ message: "Platform and username are required." });
    }
    let liveData;
    switch (platform.toLowerCase()) {
      case "leetcode":
        liveData = await fetchLeetCodeData(username);
        break;
      case "codeforces":
        liveData = await fetchCodeforcesData(username);
        break;
      default:
        return res
          .status(400)
          .json({ message: `Unsupported platform: ${platform}` });
    }
    if (!liveData) {
      return res
        .status(404)
        .json({ message: `No data found for ${platform}/${username}.` });
    }
    const updatedProfile = await CodingProfile.findOneAndUpdate(
      { user: userId, platform, username },
      { ...liveData },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error("Error fetching profile data:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req;
    const profileId = req.params.id;

    const profile = await CodingProfile.findOneAndDelete({
      _id: profileId,
      user: userId,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json({ message: "Profile deleted successfully." });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res
      .status(500)
      .json({ message: "Failed to delete profile.", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentTitle, maxTitle, currentRating, maxRating, solvedCount } =
      req.body;
    const profile = await CodingProfile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    profile.currentTitle = currentTitle || profile.currentTitle;
    profile.maxTitle = maxTitle || profile.maxTitle;
    profile.currentRating = currentRating ?? profile.currentRating;
    profile.maxRating = maxRating ?? profile.maxRating;
    profile.solvedCount = solvedCount ?? profile.solvedCount;
    profile.link = `https://www.codechef.com/users/${profile.username}`;
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCodingProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profiles = await CodingProfile.find({ user: id });
    return res.status(200).json(profiles);
  } catch (err) {
    console.error("Error fetching coding profiles:", err.message);
    return res.status(500).json({ message: "Failed to fetch coding profiles" });
  }
};
