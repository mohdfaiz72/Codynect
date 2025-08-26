import { useEffect, useState } from "react";
import { dummyUser } from "../../../utils/dummyUser";
import api from "../../../utils/api";
import { timeAgoFormat } from "../../../utils/timeAgoFormat";

const Comment = ({ postId, postType }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComment = async () => {
    setLoading(true);
    try {
      const res = await api.get("/v1/comment", {
        params: { postId, postType },
      });

      setComments(res.data.data || []);
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm px-3">Loading comments...</p>;
  }

  return (
    <div className="space-y-4 mt-3">
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm px-3">No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="px-3">
            <div className="flex items-center gap-2">
              <img
                src={comment.author?.profileImage || dummyUser.profileImage}
                alt={`${comment.author?.name || "User"} profile`}
                className="w-8 h-8 rounded-full object-cover border border-amber-700"
              />
              <div className="flex flex-col w-full overflow-hidden">
                <div className="flex justify-between">
                  <div className="text-sm font-semibold text-amber-400 leading-tight">
                    {comment.author?.name || "Unknown User"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {timeAgoFormat(comment.createdAt)}
                  </div>
                </div>
                <div className="text-xs text-gray-400 truncate pr-1">
                  {comment.author?.headline || ""}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 pr-3 mt-2 pl-10">
              {comment.text}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;
