import mongoose from "mongoose";
import basePostSchema from "./basePostSchema.js";

const achievementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Achievement",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    ...basePostSchema.obj,
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
