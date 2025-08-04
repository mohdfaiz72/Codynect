import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const comment = new Comment({
      postId: req.body.postId,
      author: req.user.id,
      text: req.body.text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
