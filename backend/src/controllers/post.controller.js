import Achievement from "../models/achievement.model.js";
import Thought from "../models/thought.model.js";
import Snippet from "../models/snippet.model.js";
import Showcase from "../models/showcase.model.js";
import Poll from "../models/poll.model.js";
import Job from "../models/job.model.js";
import Doubt from "../models/doubt.model.js";
import Article from "../models/article.model.js";
import Like from "../models/like.model.js";

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

    const jobs = await Job.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const achievements = await Achievement.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const articles = await Article.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const doubts = await Doubt.find()
      .populate("user", "name headline profileImage")
      .sort({ createdAt: -1 })
      .lean();

    const feed = [
      ...achievements,
      ...thoughts,
      ...snippets,
      ...showcases,
      ...articles,
      ...doubts,
      ...polls,
      ...jobs,
    ];
    const { _id: userId } = req.user;
    const likeDocs = await Like.find({
      user: userId,
      postId: { $in: feed.map((item) => item._id) },
    }).lean();

    const likedPostIds = new Set(likeDocs.map((like) => String(like.postId)));

    const feeds = feed
      .map((item) => ({
        ...item,
        isLiked: likedPostIds.has(String(item._id)),
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      message: "Feed fetched successfully",
      data: feeds,
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
    const { _id: userId } = req.user;

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
      user: userId,
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
    const { _id: userId } = req.user;

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
      user: userId,
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
    const { _id: userId } = req.user;

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
      user: userId,
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
    const { _id: userId } = req.user;

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
      user: userId,
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

export const postJob = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      eligibility,
      salary,
      applyLink,
      description,
      tags,
    } = req.body;
    const { _id: userId } = req.user;

    if (!company?.trim() || !role?.trim() || !location?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company, Role, and Location are required.",
      });
    }

    if (!salary?.type || !["CTC", "Stipend"].includes(salary.type)) {
      return res.status(400).json({
        success: false,
        message: "Salary type must be either 'CTC' or 'Stipend'.",
      });
    }

    if (salary.type === "CTC" && !salary.ctc) {
      return res.status(400).json({
        success: false,
        message: "CTC value is required when salary type is CTC.",
      });
    }

    if (salary.type === "Stipend" && !salary.stipend) {
      return res.status(400).json({
        success: false,
        message: "Stipend value is required when salary type is Stipend.",
      });
    }

    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    const newJob = await Job.create({
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      eligibility: eligibility?.trim() || "Open to all",
      salary: {
        type: salary.type,
        ctc: Number(salary.ctc) || 0,
        stipend: Number(salary.stipend) || 0,
      },
      applyLink: applyLink?.trim(),
      description: description?.trim(),
      tags: tagsArray,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const postAchievement = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const { _id: userId } = req.user;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const imageUrl = req.file?.path || "";

    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    const achievement = await Achievement.create({
      title: title.trim(),
      description: description.trim(),
      image: imageUrl,
      tags: tagsArray,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Achievement posted successfully",
      data: achievement,
    });
  } catch (error) {
    console.error("Error posting achievement:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const postArticle = async (req, res) => {
  try {
    const { title, content, tags, externalLink } = req.body;
    const { _id: userId } = req.user;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required",
      });
    }
    const imageUrl = req.file?.path || "";

    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    const article = await Article.create({
      title: title.trim(),
      content: content.trim(),
      tags: tagsArray,
      externalLink: externalLink?.trim() || "",
      image: imageUrl,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Article posted successfully",
      data: article,
    });
  } catch (error) {
    console.error("Error posting article:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const postDoubt = async (req, res) => {
  try {
    const { title, content, code, language, tags } = req.body;
    const { _id: userId } = req.user;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const tagsArray =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    const newDoubt = await Doubt.create({
      title: title.trim(),
      content: content.trim(),
      code: code?.trim() || "",
      language: code?.trim() ? language || "plaintext" : "",
      tags: tagsArray,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Doubt posted successfully",
      data: newDoubt,
    });
  } catch (error) {
    console.error("Error posting doubt:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
