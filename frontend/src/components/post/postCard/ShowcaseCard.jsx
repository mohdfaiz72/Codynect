import { Heart, MessageCircle, CalendarDays } from "lucide-react";
import { useState } from "react";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const showcase = {
  name: "Faiz",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080&auto=format&fit=crop",
  projectName: "Codynect",
  duration: "1st July 2025 - 15th Aug 2025",
  description:
    "This is 'Insight,' a modern analytics dashboard designed to provide real-time data visualization. It helps businesses track KPIs, user engagement, and sales metrics with an intuitive interface.",
  techStack: ["React", "Node.js", "MongoDB"],
  link: "https://github.com/faiz/codynect",
  tags: ["OpenSource", "React", "FullStack"],
  createdAt: "2025-07-11T16:00:00Z",
};

const ShowcaseCard = () => {
  const {
    image,
    description,
    techStack,
    link,
    tags,
    duration,
    projectName,
    createdAt,
  } = showcase;
  return (
    <div className="border border-amber-700 p-4 rounded-md bg-gradient-to-br from-purple-950/50 via-slate-900 to-gray-900 shadow-md">
      <PostHeader />
      <div className="m-3 space-y-1">
        {/* Project Name */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">🏷️ Project Name:</span>{" "}
          {projectName}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📝 Description:</span>{" "}
          {description}
        </p>
        {/* Tech Stack */}
        {techStack?.length > 0 && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">🛠️ Tech Stack:</span>{" "}
            {techStack.map((tech, tidx) => (
              <span
                key={tidx}
                className="bg-amber-700/70 text-xs px-2 py-0.5 rounded-full text-amber-100 mx-1"
              >
                {tech}
              </span>
            ))}
          </p>
        )}
        {/* Optional Duration */}
        {duration && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">⏳ Duration:</span>{" "}
            {duration}
          </p>
        )}

        {/* View Project Link */}
        {link && (
          <p className="text-sm text-blue-400">
            🔗{" "}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View Project
            </a>
          </p>
        )}

        {/* Tags */}
        <PostTags tags={tags} />
      </div>

      {image && (
        <img
          src={image}
          alt="Project"
          className="w-full my-3 rounded-lg border border-slate-700 shadow-sm"
        />
      )}
      <hr className="text-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default ShowcaseCard;
