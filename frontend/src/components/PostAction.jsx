import { Heart, Share2, MessageCircle } from "lucide-react";

const PostActions = ({
  postId,
  likes = 0,
  comments = 0,
  likedByUser = false,
  onLike,
  onShare,
}) => {
  return (
    <div className="flex items-center gap-6 mt-4 text-sm text-slate-400">
      {/* Like Button */}
      <button
        onClick={() => onLike(postId)}
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

      {/* Comments */}
      <button className="hover:text-amber-400 flex items-center gap-1">
        <MessageCircle size={16} />
        {comments}
      </button>

      {/* Share */}
      <button
        onClick={() => onShare(postId)}
        className="hover:text-amber-400 flex items-center gap-1"
      >
        <Share2 size={16} />
        Share
      </button>
    </div>
  );
};

export default PostActions;
