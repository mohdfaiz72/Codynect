import mongoose from "mongoose";
import basePostSchema from "./basePostSchema.js";

const doubtSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Doubt",
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
    language: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      default: "",
    },
    ...basePostSchema.obj,
  },
  { timestamps: true }
);

const Doubt = mongoose.model("Doubt", doubtSchema);
export default Doubt;
