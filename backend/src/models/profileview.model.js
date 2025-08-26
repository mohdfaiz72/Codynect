import mongoose from "mongoose";

const profileViewSchema = new mongoose.Schema(
  {
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    viewed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

profileViewSchema.index({ viewer: 1, viewed: 1 }, { unique: true });

const ProfileView = mongoose.model("ProfileView", profileViewSchema);
export default ProfileView;
