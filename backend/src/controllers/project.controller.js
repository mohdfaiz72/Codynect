import Project from "../models/project.model.js";

// ---------- Get all projects for a user ----------
export const getProjects = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const projects = await Project.find({ user: userId });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Add new project ----------
export const addProject = async (req, res) => {
  try {
    const { title, description, techStack, github, demo } = req.body;
    const { _id: userId } = req.user;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const newProject = await Project.create({
      user: userId,
      title,
      description,
      techStack: techStack || [],
      github: github || "",
      demo: demo || "",
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Update project ----------
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, github, demo } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.techStack = Array.isArray(techStack)
      ? techStack
      : project.techStack;
    project.github = github ?? project.github;
    project.demo = demo ?? project.demo;

    await project.save();
    res.status(200).json(project);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// ---------- Delete project ----------
export const deleteProject = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const project = await Project.findOneAndDelete({ _id: id, user: userId });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getProjectsById = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Project.find({ user: id });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
