import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// ROUTES
// import aiRoute from "./routes/ai.routes.js";
// import externalRoutes from "./routes/external.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import languageRoutes from "./routes/language.routes.js";
import certificationRoutes from "./routes/certification.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import codingRoutes from "./routes/coding.routes.js";
import networkRoutes from "./routes/network.routes.js";
import messageRoutes from "./routes/message.routes.js";
import postRoutes from "./routes/post.routes.js";
import likeRoutes from "./routes/like.routes.js";
import commentRoutes from "./routes/comment.routes.js";

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
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/experience", experienceRoutes);
app.use("/api/v1/skill", skillRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/language", languageRoutes);
app.use("/api/v1/certification", certificationRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/coding", codingRoutes);
app.use("/api/v1/network", networkRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/comment", commentRoutes);

// app.use("/api/v1/comments", commentRoutes);
// app.use("/api/v1/notifications", notificationRoutes);

export default app;
