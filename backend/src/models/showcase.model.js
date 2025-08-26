import mongoose from "mongoose";
import basePostSchema from "./basePostSchema.js";

const showcaseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Showcase",
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    duration: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    ...basePostSchema.obj,
  },
  { timestamps: true }
);

const Showcase = mongoose.model("Showcase", showcaseSchema);
export default Showcase;
