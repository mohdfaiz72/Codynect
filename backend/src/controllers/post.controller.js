import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username avatar");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
