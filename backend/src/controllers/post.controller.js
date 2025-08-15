import Thought from "../models/thought.model.js";
import Snippet from "../models/snippet.model.js";
import Showcase from "../models/showcase.model.js";
import Poll from "../models/poll.model.js";

export const getFeed = async (req, res) => {
  try {
    const thoughts = await Thought.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const snippets = await Snippet.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const showcases = await Showcase.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const polls = await Poll.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const feed = [...thoughts, ...snippets, ...showcases, ...polls].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({
      success: true,
      message: "Feed fetched successfully",
      data: feed,
    });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const postThought = async (req, res) => {
  try {
    const { content, tags } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }
    const imageUrl = req.file?.path || "";
    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    const thought = await Thought.create({
      content,
      tags: tagsArray,
      image: imageUrl,
      user: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Thought posted successfully",
      data: thought,
    });
  } catch (error) {
    console.error("Error posting thought:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const postSnippet = async (req, res) => {
  try {
    const {
      title,
      intuition,
      approach,
      timeComplexity,
      spaceComplexity,
      language,
      link,
      tags,
      code,
    } = req.body;

    if (!title || !title.trim() || !code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and code are required",
      });
    }

    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    // Create the snippet
    const snippet = await Snippet.create({
      title: title.trim(),
      intuition: intuition?.trim() || "",
      approach: approach?.trim() || "",
      timeComplexity: timeComplexity?.trim() || "",
      spaceComplexity: spaceComplexity?.trim() || "",
      language: language?.trim() || "cpp",
      link: link?.trim() || "",
      tags: tagsArray,
      code: code.trim(),
      user: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Snippet posted successfully",
      data: snippet,
    });
  } catch (error) {
    console.error("Error posting snippet:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const postShowcase = async (req, res) => {
  try {
    const { projectName, description, techStack, duration, link, tags } =
      req.body;

    if (!projectName?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project Name and Description are required",
      });
    }

    const techStackArray =
      typeof techStack === "string"
        ? JSON.parse(techStack)
        : Array.isArray(techStack)
        ? techStack
        : [];

    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    // Create the project showcase
    const showcase = await Showcase.create({
      projectName: projectName.trim(),
      description: description.trim(),
      techStack: techStackArray,
      duration: duration?.trim() || "",
      link: link?.trim() || "",
      tags: tagsArray,
      user: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Project posted successfully",
      data: showcase,
    });
  } catch (error) {
    console.error("Error posting project showcase:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const postPoll = async (req, res) => {
  try {
    const { question, options, tags } = req.body;

    // Validation
    if (!question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Poll question is required.",
      });
    }

    if (!options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least two options are required.",
      });
    }

    const trimmedOptions = options.map((opt) => opt.trim()).filter(Boolean);
    if (trimmedOptions.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least two non-empty options are required.",
      });
    }

    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    const newPoll = await Poll.create({
      question: question.trim(),
      options: trimmedOptions.map((opt) => ({ text: opt, votes: 0 })),
      tags: tagsArray,
      user: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Poll created successfully",
      data: newPoll,
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
