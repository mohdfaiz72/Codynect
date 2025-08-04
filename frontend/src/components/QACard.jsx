import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Tag } from "lucide-react";

const QACard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white border border-amber-700 rounded-xl p-5 shadow-md w-full max-w-xl mx-auto mb-6">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>👤 {post.author}</span>
        <span>🕒 {formatDistanceToNow(new Date(post.createdAt))} ago</span>
      </div>

      <h2 className="text-lg font-bold text-yellow-400 mb-3">
        ❓ {post.question}
      </h2>

      {post.answer ? (
        <div className="bg-gray-800 border border-gray-700 rounded-md p-3 mb-4 text-sm text-gray-200">
          <span className="text-amber-400 font-semibold">Answer:</span>{" "}
          {post.answer}
        </div>
      ) : (
        <p className="text-sm italic text-gray-400 mb-4">
          No answer yet. Be the first to contribute!
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 text-xs bg-amber-800/20 border border-amber-700 px-2 py-1 rounded-full text-amber-300"
          >
            <Tag size={12} />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-amber-400"
        >
          <Heart size={16} className={liked ? "fill-amber-400" : ""} />
          {likes} Likes
        </button>
        <div className="flex items-center gap-1 text-gray-300">
          <MessageCircle size={16} />
          {post.comments.length} Comments
        </div>
      </div>

      {post.comments.length > 0 && (
        <div className="mt-4 border-t border-gray-700 pt-2 text-sm text-gray-300">
          {post.comments.map((comment, idx) => (
            <p key={idx} className="mb-1">
              <span className="text-amber-300 font-medium">
                {comment.user}:
              </span>{" "}
              {comment.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default QACard;
