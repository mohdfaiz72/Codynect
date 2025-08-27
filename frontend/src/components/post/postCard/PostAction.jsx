import { Heart, MessageCircle, Send } from "lucide-react";
import Comment from "./Comment";
import { useState } from "react";
import api from "../../../utils/api";

const PostAction = ({
  postId,
  postType,
  isLiked,
  likesCount,
  commentsCount,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [countLike, setCountLike] = useState(likesCount);
  const [countComment, setCountComment] = useState(commentsCount);
  const [commentText, setCommentText] = useState("");
  const [showCommentModel, setShowCommentModel] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    setCountLike(liked ? countLike - 1 : countLike + 1);
    try {
      const res = await api.post("/v1/like/toggle", { postId, postType });
      console.log("Like toggled:", res.data);
    } catch (error) {
      setLiked(liked);
      setCountLike(count);
      console.error("Error toggling like:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await api.post("/v1/comment/add", {
        postId,
        postType,
        text: commentText,
      });
      setCommentText("");
      setCountComment((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <>
      {/* Like & Comment Counts */}
      <div className="flex justify-between items-center mx-3 text-sm">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-amber-400"
        >
          <Heart size={16} className={liked ? "fill-amber-400" : ""} />
          {countLike} Likes
        </button>
        <button
          onClick={() => setShowCommentModel(!showCommentModel)}
          className="flex items-center gap-1 text-gray-300"
        >
          <MessageCircle size={16} />
          {countComment} Comments
        </button>
      </div>

      {/* Comment Input Box */}
      <div className="mt-2 px-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddComment();
          }}
          className="flex items-center gap-2"
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-300 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 text-sm resize-none scrollbar-hide"
            rows={1}
          />
          <button
            type="submit"
            className="hover:scale-110 transition-transform cursor-pointer hover:text-amber-200 text-amber-400"
          >
            <Send />
          </button>
        </form>
      </div>
      {showCommentModel && <Comment postId={postId} postType={postType} />}
    </>
  );
};

export default PostAction;
