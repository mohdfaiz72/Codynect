import { Heart, MessageCircle } from "lucide-react";

const PostAction = ({ likesCount = 0, commentsCount = 0 }) => {
  return (
    <div className="flex justify-between items-center mx-3 text-sm">
      <button
        //onClick={handleLike}
        className="flex items-center gap-1 text-amber-400"
      >
        <Heart size={16} className="fill-amber-400" />
        {likesCount} Likes
      </button>
      <div className="flex items-center gap-1 text-gray-300">
        <MessageCircle size={16} />
        {commentsCount} Comments
      </div>
    </div>
  );
};

export default PostAction;
