import Message from "../models/message.model.js";
import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import http from "http";
import app from "../app.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// --- Authentication Middleware for Socket.io ---
io.use((socket, next) => {
  try {
    const cookieString = socket.handshake.headers.cookie;
    if (!cookieString) {
      return next(new Error("Authentication error: No cookie provided."));
    }
    const cookies = cookie.parse(cookieString);

    const token = cookies.token;
    if (!token) {
      return next(
        new Error("Authentication error: Token not found in cookies.")
      );
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(
          new Error("Authentication error: Invalid or expired token.")
        );
      }
      socket.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error("Error in socket authentication middleware:", error);
    next(new Error("Authentication error."));
  }
});

// --- Main Connection Handler ---
io.on("connection", (socket) => {
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
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
    //console.log("User disconnected:", socket.id);
  });
});

export default server;
