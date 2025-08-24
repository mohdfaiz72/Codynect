import Experience from "../models/experience.model.js";

// ---------- Get all experiences for a user ----------
export const getExperience = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const experience = await Experience.find({ user: userId });
    res.status(200).json(experience);
  } catch (err) {
    console.error("Error fetching experiences:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Add new experience ----------
export const addExperience = async (req, res) => {
  try {
    const { role, company, location, startDate, endDate, description } =
      req.body;
    const { _id: userId } = req.user;

    if (
      !role ||
      !company ||
      !location ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExperience = await Experience.create({
      user: userId,
      role,
      company,
      location,
      startDate,
      endDate,
      description,
    });

    res.status(201).json(newExperience);
  } catch (err) {
    console.error("Error adding experience:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Update experience ----------
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, company, location, startDate, endDate, description } =
      req.body;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Update only provided fields
    experience.role = role || experience.role;
    experience.company = company || experience.company;
    experience.location = location || experience.location;
    experience.startDate = startDate || experience.startDate;
    experience.endDate = endDate || experience.endDate;
    experience.description = description || experience.description;

    await experience.save();
    res.status(200).json(experience);
  } catch (err) {
    console.error("Error updating experience:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Delete experience ----------
export const deleteExperience = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const experience = await Experience.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!experience) {
      return res.status(404).json({ message: "Experience not found." });
    }

    res.status(200).json({ message: "Experience deleted successfully." });
  } catch (err) {
    console.error("Error deleting experience:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.find({ user: id });
    res.status(200).json(experience);
  } catch (err) {
    console.error("Error fetching experiences:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
