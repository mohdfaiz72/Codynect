import mongoose from "mongoose";

const showcaseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Showcase",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    tags: {
      type: [String],
      default: [],
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

const Showcase = mongoose.model("Showcase", showcaseSchema);
export default Showcase;
