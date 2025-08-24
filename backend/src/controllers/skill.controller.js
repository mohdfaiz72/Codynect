import Skill from "../models/skill.model.js";

// ---------- Get all skills for a user ----------
export const getSkills = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const skills = await Skill.find({ user: userId });
    res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Add new skill category ----------
export const addSkill = async (req, res) => {
  try {
    const { category, skills } = req.body;
    const { _id: userId } = req.user;

    if (!category || !skills || !Array.isArray(skills) || skills.length === 0) {
      return res
        .status(400)
        .json({ message: "Category and at least one skill are required." });
    }

    const newSkill = await Skill.create({
      user: userId,
      category,
      skills,
    });

    res.status(201).json(newSkill);
  } catch (err) {
    console.error("Error adding skill:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Update skills (category or skills array) ----------
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, skills } = req.body;

    const skillDoc = await Skill.findById(id);
    if (!skillDoc) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // update only provided fields
    skillDoc.category = category || skillDoc.category;
    if (Array.isArray(skills) && skills.length > 0) {
      skillDoc.skills = skills;
    }

    await skillDoc.save();
    res.status(200).json(skillDoc);
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Delete skill category ----------
export const deleteSkill = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const skillDoc = await Skill.findOneAndDelete({ _id: id, user: userId });

    if (!skillDoc) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(200).json({ message: "Skill deleted successfully." });
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getSkillsById = async (req, res) => {
  try {
    const { id } = req.params;
    const skills = await Skill.find({ user: id });
    res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
