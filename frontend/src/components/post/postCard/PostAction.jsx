import { Heart, MessageCircle } from "lucide-react";

const PostAction = () => {
  return (
    <div className="flex justify-between items-center mx-3 text-sm">
      <button
        //onClick={handleLike}
        className="flex items-center gap-1 text-amber-400"
      >
        <Heart size={16} className={"fill-amber-400"} />
        Likes
      </button>
      <div className="flex items-center gap-1 text-gray-300">
        <MessageCircle size={16} />
        Comments
      </div>
    </div>
  );
};

export default PostAction;
