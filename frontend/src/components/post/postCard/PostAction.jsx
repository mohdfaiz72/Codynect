import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import api from "../../../utils/api";

const PostAction = ({
  postId,
  postType,
  isLiked,
  likesCount,
  commentsCount = 0,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);
  const handleLike = async () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    try {
      const res = await api.post("/v1/like/toggle", { postId, postType });
      console.log("Like toggled:", res.data);
    } catch (error) {
      setLiked(liked);
      setCount(count);
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex justify-between items-center mx-3 text-sm">
      <button
        onClick={handleLike}
        className={"flex items-center gap-1 text-amber-400"}
      >
        <Heart size={16} className={liked ? "fill-amber-400" : ""} />
        {count} Likes
      </button>
      <div className="flex items-center gap-1 text-gray-300">
        <MessageCircle size={16} />
        {commentsCount} Comments
      </div>
    </div>
  );
};

export default PostAction;
