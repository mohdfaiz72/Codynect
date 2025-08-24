import Language from "../models/language.model.js";

// ---------- Get all languages for a user ----------
export const getLanguages = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const languages = await Language.find({ user: userId });
    res.status(200).json(languages);
  } catch (err) {
    console.error("Error fetching languages:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Add new language ----------
export const addLanguage = async (req, res) => {
  try {
    const { name, level } = req.body;
    const { _id: userId } = req.user;

    if (!name || !level) {
      return res.status(400).json({ message: "Name and level are required." });
    }

    const newLanguage = await Language.create({
      user: userId,
      name,
      level,
    });

    res.status(201).json(newLanguage);
  } catch (err) {
    console.error("Error adding language:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Update language ----------
export const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level } = req.body;

    const language = await Language.findById(id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    language.name = name || language.name;
    language.level = level || language.level;

    await language.save();
    res.status(200).json(language);
  } catch (err) {
    console.error("Error updating language:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Delete language ----------
export const deleteLanguage = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const language = await Language.findOneAndDelete({ _id: id, user: userId });

    if (!language) {
      return res.status(404).json({ message: "Language not found." });
    }

    res.status(200).json({ message: "Language deleted successfully." });
  } catch (err) {
    console.error("Error deleting language:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getLanguagesById = async (req, res) => {
  try {
    const { id } = req.params;
    const languages = await Language.find({ user: id });
    res.status(200).json(languages);
  } catch (err) {
    console.error("Error fetching languages:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
