import mongoose from "mongoose";
import basePostSchema from "./basePostSchema.js";

const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  { _id: false }
);

const pollSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Poll",
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [optionSchema],
    },
    ...basePostSchema.obj,
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
