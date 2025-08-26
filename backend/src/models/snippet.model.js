import mongoose from "mongoose";
import basePostSchema from "./basePostSchema.js";

const snippetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Snippet",
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
    code: {
      type: String,
      required: true,
    },
    ...basePostSchema.obj,
  },
  { timestamps: true }
);

const Snippet = mongoose.model("Snippet", snippetSchema);
export default Snippet;
