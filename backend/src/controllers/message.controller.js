import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getConversations = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
          },
          lastMessage: { $first: "$content" },
          lastMessageTime: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          id: "$user._id",
          name: "$user.name",
          profileImage: "$user.profileImage",
          lastMessage: 1,
          lastMessageTime: 1,
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return res.status(200).json(conversations);
  } catch (error) {
    console.error("getConversations error:", error);
    return res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { partnerId } = req.params;

    // 1. Fetch user info
    const user = await User.findById(partnerId).select("name profileImage");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Fetch the latest message between the two users
    const lastMessage = await Message.findOne({
      $or: [
        { sender: userId, receiver: partnerId },
        { sender: partnerId, receiver: userId },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    // 3. Format and return the response
    const conversation = {
      id: user._id,
      name: user.name,
      profileImage: user.profileImage,
      lastMessage: lastMessage?.content || "",
      lastMessageTime: lastMessage?.createdAt || null,
    };

    return res.status(200).json(conversation);
  } catch (error) {
    console.error("getConversationById error:", error);
    return res.status(500).json({ error: "Failed to fetch conversation" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { receiverId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ error: err.message });
  }
};
