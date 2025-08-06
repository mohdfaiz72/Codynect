import User from "../models/user.model.js";
import Network from "../models/network.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const { userId } = req;

    const users = await User.find({ _id: { $ne: userId } }).select(
      "_id name headline profileImage coverImage"
    );

    const networks = await Network.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const enrichedUsers = users.map((user) => {
      const net = networks.find(
        (n) =>
          (n.sender.toString() === userId &&
            n.receiver.toString() === user._id.toString()) ||
          (n.receiver.toString() === userId &&
            n.sender.toString() === user._id.toString())
      );

      let status = "new";

      if (net) {
        if (net.status === "connected") {
          status = "connected";
        } else if (net.status === "pending") {
          if (net.sender.toString() === userId) {
            status = "sent";
          } else {
            status = "received";
          }
        }
      }

      return {
        ...user.toObject(),
        status,
      };
    });

    res.json(enrichedUsers);
  } catch (err) {
    console.error("Error in getUsersForNetwork:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
