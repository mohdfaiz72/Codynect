import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// ROUTES
// import aiRoute from "./routes/ai.routes.js";
// import externalRoutes from "./routes/external.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import networkRoutes from "./routes/network.routes.js";
import messageRoutes from "./routes/message.routes.js";

// import postRoutes from "./routes/post.routes.js";
// import commentRoutes from "./routes/comment.routes.js";
// import notificationRoutes from "./routes/notification.routes.js";

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ROUTES
// app.use("/api/v1/ai", aiRoute);
// app.use("/api/v1/external", externalRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/network", networkRoutes);
app.use("/api/v1/message", messageRoutes);

// app.use("/api/v1/posts", postRoutes);
// app.use("/api/v1/comments", commentRoutes);
// app.use("/api/v1/notifications", notificationRoutes);

export default app;
