import mongoose from "mongoose";

const networkSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "connected"],
    default: "pending",
  },
});

const Network = mongoose.model("Network", networkSchema);
export default Network;
