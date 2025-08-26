import mongoose from "mongoose";
import basePostSchema from "./basePostSchema.js";

const thoughtSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Thought",
    },
    content: {
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
  {
    timestamps: true,
  }
);

const Thought = mongoose.model("Thought", thoughtSchema);
export default Thought;
