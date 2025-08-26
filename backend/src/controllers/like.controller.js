import Like from "../models/like.model.js";
import Thought from "../models/thought.model.js";
import Showcase from "../models/showcase.model.js";
import Snippet from "../models/snippet.model.js";
import Achievement from "../models/achievement.model.js";
import Job from "../models/job.model.js";
import Doubt from "../models/doubt.model.js";
import Poll from "../models/poll.model.js";
import Article from "../models/article.model.js";

export const toggleLike = async (req, res) => {
  const { postId, postType } = req.body;
  const { _id: userId } = req.user;

  try {
    const existingLike = await Like.findOne({ user: userId, postId, postType });
    let message;
    if (existingLike) {
      await existingLike.deleteOne();
      message = "Post unliked successfully";

      const Post = getPostModel(postType);
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
    } else {
      await Like.create({ user: userId, postId, postType });
      message = "Post liked successfully";

      const Post = getPostModel(postType);
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
    }

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error during toggling like", error);
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
