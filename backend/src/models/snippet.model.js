import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Snippet",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    intuition: {
      type: String,
      trim: true,
    },
    approach: {
      type: String,
      trim: true,
    },
    timeComplexity: {
      type: String,
      trim: true,
    },
    spaceComplexity: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
      required: true,
    },
    link: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    code: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Snippet = mongoose.model("Snippet", snippetSchema);
export default Snippet;
