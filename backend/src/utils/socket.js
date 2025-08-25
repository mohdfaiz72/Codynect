import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import app from "../app.js";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// --- Authentication Middleware for Socket.io ---
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided."));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return next(new Error("Authentication error: User not found."));
    }

    socket.user = user;
    socket.userId = user._id;
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    next(new Error("Authentication error: Invalid or expired token."));
  }
});

// --- Main Connection Handler ---
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined chat ${chatId}`);
  });

  socket.on("send-message", async (data) => {
    try {
      const senderId = socket.userId;
      const { text, receiverId, chatId } = data;

      if (!senderId || !text || !receiverId || !chatId) {
        console.error("Invalid message payload received:", { data, senderId });
        return;
      }

      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content: text,
      });

      const savedMessage = await newMessage.save();
      io.to(chatId).emit("receive-message", savedMessage);
    } catch (error) {
      console.error("Error handling send-message event:", error);
      socket.emit("message-error", {
        message: "Your message could not be sent.",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

export default server;
