import mongoose from "mongoose";

const CodingProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platform: {
      type: String,
      required: true,
      enum: ["LeetCode", "Codeforces", "CodeChef"],
    },
    username: {
      type: String,
      required: true,
    },
    currentTitle: {
      type: String,
      default: "",
    },
    maxTitle: {
      type: String,
      default: "",
    },
    currentRating: {
      type: Number,
      default: 0,
    },
    maxRating: {
      type: Number,
      default: 0,
    },
    solvedCount: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const CodingProfile = mongoose.model("CodingProfile", CodingProfileSchema);
export default CodingProfile;
