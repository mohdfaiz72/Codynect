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

// 1. Send Request
export const sendRequest = async (req, res) => {
  const senderId = req.userId;
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

// 2. Accept Request
export const acceptRequest = async (req, res) => {
  const receiverId = req.userId;
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

// 3. Reject Request (delete)
export const rejectRequest = async (req, res) => {
  const receiverId = req.userId;
  const { senderId } = req.body;

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

// 4. Withdraw Request (sender deletes)
export const withdrawRequest = async (req, res) => {
  const senderId = req.userId;
  const { receiverId } = req.body;

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

// 5. Disconnect Connection (both users are already connected)
export const disconnectConnection = async (req, res) => {
  const userId = req.userId;
  const { receiverId } = req.body;

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
