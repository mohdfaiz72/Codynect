import Certification from "../models/certification.model.js";

// ---------- Get all certifications for a user ----------
export const getCertifications = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const certifications = await Certification.find({ user: userId });
    res.status(200).json(certifications);
  } catch (err) {
    console.error("Error fetching certifications:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Add new certification ----------
export const addCertification = async (req, res) => {
  try {
    const { title, issuedBy, issuedDate, credentialId, url } = req.body;
    const { _id: userId } = req.user;

    if (!title || !issuedBy || !issuedDate || !credentialId || !url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCertification = await Certification.create({
      user: userId,
      title,
      issuedBy,
      issuedDate,
      credentialId,
      url,
    });

    res.status(201).json(newCertification);
  } catch (err) {
    console.error("Error adding certification:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Update certification ----------
export const updateCertification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, issuedBy, issuedDate, credentialId, url } = req.body;

    const certification = await Certification.findById(id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }

    certification.title = title || certification.title;
    certification.issuedBy = issuedBy || certification.issuedBy;
    certification.issuedDate = issuedDate || certification.issuedDate;
    certification.credentialId = credentialId || certification.credentialId;
    certification.url = url || certification.url;

    await certification.save();
    res.status(200).json(certification);
  } catch (err) {
    console.error("Error updating certification:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Delete certification ----------
export const deleteCertification = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const certification = await Certification.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!certification) {
      return res.status(404).json({ message: "Certification not found." });
    }

    res.status(200).json({ message: "Certification deleted successfully." });
  } catch (err) {
    console.error("Error deleting certification:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getCertificationsById = async (req, res) => {
  try {
    const { id } = req.params;
    const certifications = await Certification.find({ user: id });
    res.status(200).json(certifications);
  } catch (err) {
    console.error("Error fetching certifications:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
