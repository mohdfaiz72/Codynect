import mongoose from "mongoose";
import basePostSchema from "./basePostSchema.js";

const articleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Article",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    externalLink: {
      type: String,
      default: "",
    },
    ...basePostSchema.obj,
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
