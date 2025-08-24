import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getConversations = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    // 1. Find all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: -1 });

    const uniqueUserIds = new Set();

    // 2. Extract unique partner user IDs
    messages.forEach((msg) => {
      const otherUserId =
        msg.sender.toString() === userId
          ? msg.receiver.toString()
          : msg.sender.toString();
      uniqueUserIds.add(otherUserId);
    });

    const conversations = [];

    for (const partnerId of uniqueUserIds) {
      // 3. Fetch user info
      const user = await User.findById(partnerId).select("name profileImage");

      // 4. Fetch last message between the two
      const lastMessage = await Message.findOne({
        $or: [
          { sender: userId, receiver: partnerId },
          { sender: partnerId, receiver: userId },
        ],
      })
        .sort({ createdAt: -1 })
        .lean();

      conversations.push({
        id: user._id,
        name: user.name,
        profileImage: user.profileImage,
        lastMessage: lastMessage?.content || "",
        lastMessageTime: lastMessage?.createdAt,
      });
    }

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
