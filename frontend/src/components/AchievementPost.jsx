import { BadgeCheck, Trophy, Share2, Heart } from "lucide-react";

const AchievementPost = ({ post }) => {
  const {
    _id,
    user = {},
    title = "Untitled Achievement",
    description = "",
    badge,
    date,
    likes = 0,
    commentsCount = 0,
    likedByUser = false,
    onLike = () => {},
    onShare = () => {},
  } = post;

  return (
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 rounded-xl p-4 border border-amber-700 shadow-md mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full border border-amber-500"
        />
        <div>
          <h3 className="text-slate-100 font-semibold">
            {user.name || "Unknown User"}
          </h3>
          <p className="text-xs text-slate-400">
            {date ? new Date(date).toDateString() : "Unknown Date"}
          </p>
        </div>
        <div className="ml-auto text-amber-500">
          <BadgeCheck size={20} />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg text-amber-400 font-bold flex items-center gap-2">
        <Trophy size={20} /> {title}
      </h2>

      {/* Description */}
      <p className="text-slate-300 text-sm mt-2">{description}</p>

      {/* Badge/Certificate Image */}
      {badge && (
        <div className="mt-3">
          <img
            src={badge}
            alt="Achievement Badge"
            className="w-full max-w-xs rounded border border-slate-700"
          />
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center gap-6 mt-4 text-sm text-slate-400">
        <button
          onClick={() => onLike(_id)}
          className={`flex items-center gap-1 transition-colors ${
            likedByUser ? "text-amber-400" : "hover:text-amber-400"
          }`}
        >
          <Heart
            size={16}
            className="transition-all"
            fill={likedByUser ? "currentColor" : "none"}
          />
          {likes}
        </button>

        <button className="hover:text-amber-400 flex items-center gap-1">
          💬 {commentsCount} Comments
        </button>

        <button
          onClick={() => onShare(_id)}
          className="hover:text-amber-400 flex items-center gap-1"
        >
          <Share2 size={16} /> Share
        </button>
      </div>
    </div>
  );
};

export default AchievementPost;
