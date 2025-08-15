import mongoose from "mongoose";

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
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
