import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow", "mention", "system"],
      required: true,
    },
    content: { type: String },
    isRead: { type: Boolean, default: false },
    relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
