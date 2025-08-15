import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Job",
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    eligibility: {
      type: String,
      default: "Open to all",
      trim: true,
    },
    salary: {
      ctc: { type: Number, default: 0 },
      stipend: { type: Number, default: 0 },
      type: { type: String, enum: ["CTC", "Stipend"], default: null },
    },
    applyLink: {
      type: String,
      default: null,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
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

const Job = mongoose.model("Job", jobSchema);
export default Job;
