import { Heart, MessageCircle, CalendarDays } from "lucide-react";
import { useState } from "react";

const ShowcaseCard = ({
  showcase,
  onLike = () => {},
  onComment = () => {},
}) => {
  const [showComments, setShowComments] = useState(false);
  const {
    id,
    title,
    description,
    image,
    techStack,
    link,
    author,
    likes = 0,
    comments = [],
    createdAt,
    likedByUser = false,
    tags = [],
  } = showcase;

  return (
    <div className="border border-amber-700 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-200 p-4 rounded-xl shadow-md space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-amber-400">{title}</h3>
          <p className="text-xs text-slate-400">by {author}</p>
        </div>
        <p className="text-xs text-slate-500">
          {new Date(createdAt).toDateString()}
        </p>
      </div>

      {/* Optional Image */}
      {image && (
        <img
          src={image}
          alt="Project"
          className="w-full rounded-lg border border-slate-700 shadow-sm"
        />
      )}

      {/* Description */}
      <p className="text-sm text-slate-300">{description}</p>

      {/* Tech Stack */}
      <div className="text-xs text-slate-400 italic">
        Built with: {techStack.join(", ")}
      </div>

      {/* View Project Button */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-1 font-medium text-slate-900 rounded-full text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200"
        >
          View Project
        </a>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 bg-slate-800 rounded-full border border-amber-700 text-amber-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mt-2 text-sm text-slate-400">
        <button
          onClick={() => onLike(id)}
          className={`flex items-center gap-1 transition-colors ${
            likedByUser ? "text-amber-400" : "hover:text-amber-400"
          }`}
        >
          <Heart
            size={16}
            fill={likedByUser ? "currentColor" : "none"}
            className="transition-all"
          />
          {likes}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="hover:text-amber-400 flex items-center gap-1"
        >
          <MessageCircle size={16} /> {comments.length} Comments
        </button>
      </div>

      {/* Comments Section */}
      {showComments && comments.length > 0 && (
        <div className="mt-3 space-y-2">
          {comments.map((comment, idx) => (
            <div
              key={idx}
              className="bg-slate-800 text-slate-300 text-sm px-3 py-2 rounded"
            >
              <strong className="text-amber-300">{comment.user}:</strong>{" "}
              {comment.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowcaseCard;
