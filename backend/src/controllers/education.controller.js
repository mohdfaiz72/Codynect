import Education from "../models/education.model.js";

// ---------- Get all education for a user ----------
export const getEducation = async (req, res) => {
  try {
    const userId = req.user._id;
    const education = await Education.find({ user: userId });
    res.status(200).json(education);
  } catch (err) {
    console.error("Error fetching education:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Add new education ----------
export const addEducation = async (req, res) => {
  try {
    const { degree, institution, startYear, endYear, grade } = req.body;
    const userId = req.user._id;

    if (!degree || !institution || !startYear || !endYear) {
      return res.status(400).json({ message: "All required fields missing." });
    }

    const newEducation = await Education.create({
      user: userId,
      degree,
      institution,
      startYear,
      endYear,
      grade,
    });

    res.status(201).json(newEducation);
  } catch (err) {
    console.error("Error adding education:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Update education ----------
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { degree, institution, startYear, endYear, grade } = req.body;

    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    // update fields only if provided
    education.degree = degree || education.degree;
    education.institution = institution || education.institution;
    education.startYear = startYear || education.startYear;
    education.endYear = endYear || education.endYear;
    education.grade = grade || education.grade;

    await education.save();
    res.status(200).json(education);
  } catch (err) {
    console.error("Error updating education:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Delete education ----------
export const deleteEducation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const education = await Education.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!education) {
      return res.status(404).json({ message: "Education not found." });
    }

    res.status(200).json({ message: "Education deleted successfully." });
  } catch (err) {
    console.error("Error deleting education:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.find({ user: id });
    return res.status(200).json(education);
  } catch (err) {
    console.error("Error fetching education:", err.message);
    return res.status(500).json({ message: "Failed to fetch education" });
  }
};
