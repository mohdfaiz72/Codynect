import User from "../models/user.model.js";

export const updateProfileImage = async (req, res) => {
  try {
    const { userId } = req; // from verifyJWT middleware

    // Logic for removing the current profile image
    if (req.body.remove === "true") {
      const user = await User.findByIdAndUpdate(
        userId,
        { profileImage: "" }, // Set to an empty string or a default image URL
        { new: true }
      ).select("-password"); // Exclude password hash from the response

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      return res
        .status(200)
        .json({ message: "Profile image removed successfully.", user });
    }

    // Check if a file was uploaded by multer
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
    const { userId } = req;

    // Handle removal request
    if (req.body.remove === "true") {
      const user = await User.findByIdAndUpdate(
        userId,
        { coverImage: "" }, // or set to a default cover image URL
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      return res
        .status(200)
        .json({ message: "Cover image removed successfully.", user });
    }

    // Check if file is uploaded
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
    const { userId } = req;
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

    if (!Array.isArray(experience)) {
      return res.status(400).json({
        message: "Invalid input. The 'experience' field must be an array.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { experience },
      { new: true }
    );

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
