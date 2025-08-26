import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "postType",
    },
    postType: {
      type: String,
      required: true,
      enum: [
        "Thought",
        "Showcase",
        "Achievement",
        "Snippet",
        "Jobs",
        "Article",
        "Doubt",
        "Poll",
      ],
    },
  },
  { timestamps: true }
);

likeSchema.index({ user: 1, postId: 1, postType: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);
export default Like;
