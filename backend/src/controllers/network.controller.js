import User from "../models/user.model.js";
import Network from "../models/network.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const userIdStr = req.user._id.toString();

    const users = await User.find({ _id: { $ne: userIdStr } }).select(
      "_id name headline profileImage coverImage"
    );

    const networks = await Network.find({
      $or: [{ sender: userIdStr }, { receiver: userIdStr }],
    });

    const netMap = {};
    networks.forEach((n) => {
      const key = [n.sender.toString(), n.receiver.toString()].sort().join("-");
      netMap[key] = n;
    });

    const enrichedUsers = users.map((user) => {
      const key = [userIdStr, user._id.toString()].sort().join("-");
      const net = netMap[key];

      let status = "new";
      if (net) {
        if (net.status === "connected") {
          status = "connected";
        } else if (net.status === "pending") {
          status = net.sender.toString() === userIdStr ? "sent" : "received";
        }
      }

      return {
        ...user.toObject(),
        status,
      };
    });

    res.json(enrichedUsers);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
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

export const sendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;

  try {
    const existing = await Network.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (existing)
      return res.status(400).json({ message: "Request already exists" });

    const request = new Network({ sender: senderId, receiver: receiverId });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    console.error("Send request failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const acceptRequest = async (req, res) => {
  const receiverId = req.user._id;
  const { senderId } = req.body;

  try {
    const request = await Network.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });
    if (!request) {
      return res.status(404).json({ message: "No pending request found" });
    }

    request.status = "connected";
    await request.save();
    res.status(200).json({ message: "Request accepted", connection: request });
  } catch (error) {
    console.error("Accept request failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectRequest = async (req, res) => {
  const receiverId = req.user._id;
  const { senderId } = req.query;

  try {
    const request = await Network.findOneAndDelete({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "No pending request found" });
    }

    res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    console.error("Reject request failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const withdrawRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.query;

  try {
    const request = await Network.findOneAndDelete({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "No pending request found" });
    }

    res.status(200).json({ message: "Request withdrawn" });
  } catch (error) {
    console.error("Withdraw request failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const disconnectConnection = async (req, res) => {
  const userId = req.user._id;
  const { receiverId } = req.query;

  try {
    const connection = await Network.findOneAndDelete({
      $or: [
        { sender: userId, receiver: receiverId, status: "connected" },
        { sender: receiverId, receiver: userId, status: "connected" },
      ],
    });

    if (!connection) {
      return res.status(404).json({ message: "No active connection found" });
    }

    res.status(200).json({ message: "Connection disconnected" });
  } catch (error) {
    console.error("Disconnect connection failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
