import mongoose from "mongoose";

// Education Schema
const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startYear: { type: String, required: true },
    endYear: { type: String, required: true },
    grade: { type: String },
  },
  { _id: false }
);

// Experience Schema
const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

// Skill Category Schema
const skillCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    skills: [{ type: String }],
  },
  { _id: false }
);

// Language Schema
const languageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true },
  },
  { _id: false }
);

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
  },
  { _id: false }
);

// Certification Schema
const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issuedDate: { type: String, required: true },
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

// Main User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    headline: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    address: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    connections: { type: Number, default: 0 },
    about: { type: String, default: "" },
    education: { type: [educationSchema], default: [] },
    experience: { type: [experienceSchema], default: [] },
    skills: { type: [skillCategorySchema], default: [] },
    languages: { type: [languageSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
    certifications: { type: [certificationSchema], default: [] },
  },
  { timestamps: true }
);

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
