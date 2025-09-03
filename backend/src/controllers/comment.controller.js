import Comment from "../models/comment.model.js";
import Thought from "../models/thought.model.js";
import Showcase from "../models/showcase.model.js";
import Snippet from "../models/snippet.model.js";
import Achievement from "../models/achievement.model.js";
import Job from "../models/job.model.js";
import Doubt from "../models/doubt.model.js";
import Poll from "../models/poll.model.js";
import Article from "../models/article.model.js";

export const getAllComments = async (req, res) => {
  try {
    const { postId, postType, page = 1, limit = 5 } = req.query;

    if (!postId || !postType) {
      return res.status(400).json({
        success: false,
        message: "postId and postType are required",
      });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const comments = await Comment.find({ postId, postType })
      .populate("author", "name profileImage headline")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalCount = await Comment.countDocuments({ postId, postType });

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalComments: totalCount,
        totalPages: Math.ceil(totalCount / Number(limit)),
        hasMore: skip + comments.length < totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, postType, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text cannot be empty",
      });
    }

    const { _id: userId } = req.user;

    const comment = await Comment.create({
      author: userId,
      postId,
      postType,
      text: text.trim(),
    });

    const Post = getPostModel(postType);
    if (Post) {
      await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
    }

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId, postId, postType } = req.body;
    const { _id: userId } = req.user;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    await comment.deleteOne();

    const Post = getPostModel(postType);
    if (Post) {
      await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: -1 } });
    }

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const getPostModel = (postType) => {
  switch (postType) {
    case "Thought":
      return Thought;
    case "Showcase":
      return Showcase;
    case "Achievement":
      return Achievement;
    case "Snippet":
      return Snippet;
    case "Jobs":
      return Job;
    case "Article":
      return Article;
    case "Doubt":
      return Doubt;
    case "Poll":
      return Poll;
    default:
      throw new Error("Invalid post type");
  }
};
