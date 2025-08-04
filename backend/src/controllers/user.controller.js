import User from "../models/user.model.js";

// Update Profile Image
export const updateProfileImage = async (req, res) => {
  try {
    const { userId } = req; // Assuming middleware sets req.userId from token
    const { profileImage } = req.body;

    if (!profileImage)
      return res.status(400).json({ error: "No profile image provided." });

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    );

    res.json({ message: "Profile image updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Cover Image
export const updateCoverImage = async (req, res) => {
  try {
    const { userId } = req;
    const { coverImage } = req.body;

    if (!coverImage)
      return res.status(400).json({ error: "No cover image provided." });

    const user = await User.findByIdAndUpdate(
      userId,
      { coverImage },
      { new: true }
    );

    res.json({ message: "Cover image updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Name, Headline, and Address
export const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req;
    const { name, headline, address } = req.body;

    if (!name || !headline || !address || typeof address !== "object")
      return res.status(400).json({ error: "Missing or invalid fields." });

    const user = await User.findByIdAndUpdate(
      userId,
      { name, headline, address },
      { new: true }
    );

    res.json({ message: "User details updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserAbout = async (req, res) => {
  try {
    const { userId } = req;
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

export const updateUserEducation = async (req, res) => {
  try {
    const { userId } = req;
    const { education } = req.body;

    // 3. Validate the input
    // Check if 'education' is provided and is an array.
    if (!Array.isArray(education)) {
      return res.status(400).json({
        message: "Invalid input. The 'education' field must be an array.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { education },
      { new: true }
    );

    res.status(200).json({
      message: "User education details updated successfully.",
      user,
    });
  } catch (err) {
    console.error("Error updating user education:", err);
    res.status(500).json({
      message: "An error occurred while updating education details.",
      error: err.message,
    });
  }
};

export const updateUserExperience = async (req, res) => {
  try {
    const { userId } = req;
    const { experience } = req.body;

    // 1. Validate the input
    if (!Array.isArray(experience)) {
      return res.status(400).json({
        message: "Invalid input. The 'experience' field must be an array.",
      });
    }

    // 2. Update user experience
    const user = await User.findByIdAndUpdate(
      userId,
      { experience },
      { new: true }
    );

    // 3. Send success response
    res.status(200).json({
      message: "User experience details updated successfully.",
      user,
    });
  } catch (err) {
    console.error("Error updating user experience:", err);
    res.status(500).json({
      message: "An error occurred while updating experience details.",
      error: err.message,
    });
  }
};

export const updateUserSkills = async (req, res) => {
  try {
    const { userId } = req;
    const { skills } = req.body;

    const isValid =
      Array.isArray(skills) &&
      skills.every(
        (group) =>
          typeof group.category === "string" &&
          Array.isArray(group.skills) &&
          group.skills.every((s) => typeof s === "string")
      );

    if (!isValid) {
      return res.status(400).json({
        message:
          "Invalid input. 'skills' must be an array of objects with 'category' and 'skills' as string arrays.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { skills },
      { new: true }
    );
    res.status(200).json({
      message: "User skills updated successfully.",
      user,
    });
  } catch (err) {
    console.error("Error updating user skills:", err);
    res.status(500).json({
      message: "An error occurred while updating skills.",
      error: err.message,
    });
  }
};

export const updateUserCodingProfiles = async (req, res) => {
  try {
    const { userId } = req;
    const { codingProfiles } = req.body;

    if (!Array.isArray(codingProfiles)) {
      return res
        .status(400)
        .json({ message: "'codingProfiles' must be an array." });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { codingProfiles },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Coding profiles updated successfully.", user });
  } catch (err) {
    console.error("Error updating coding profiles:", err);
    res
      .status(500)
      .json({ message: "Error updating coding profiles.", error: err.message });
  }
};

export const updateUserLanguages = async (req, res) => {
  try {
    const { userId } = req;
    const { languages } = req.body;

    if (!Array.isArray(languages)) {
      return res.status(400).json({ message: "'languages' must be an array." });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { languages },
      { new: true }
    );

    res.status(200).json({ message: "Languages updated successfully.", user });
  } catch (err) {
    console.error("Error updating languages:", err);
    res
      .status(500)
      .json({ message: "Error updating languages.", error: err.message });
  }
};

export const updateUserCertifications = async (req, res) => {
  try {
    const { userId } = req;
    const { certifications } = req.body;

    if (!Array.isArray(certifications)) {
      return res
        .status(400)
        .json({ message: "'certifications' must be an array." });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { certifications },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Certifications updated successfully.", user });
  } catch (err) {
    console.error("Error updating certifications:", err);
    res
      .status(500)
      .json({ message: "Error updating certifications.", error: err.message });
  }
};

export const updateUserProjects = async (req, res) => {
  try {
    const { userId } = req;
    const { projects } = req.body;

    if (!Array.isArray(projects)) {
      return res.status(400).json({ message: "'projects' must be an array." });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { projects },
      { new: true }
    );

    res.status(200).json({ message: "Projects updated successfully.", user });
  } catch (err) {
    console.error("Error updating projects:", err);
    res
      .status(500)
      .json({ message: "Error updating projects.", error: err.message });
  }
};
