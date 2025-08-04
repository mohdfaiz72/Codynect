import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";

const PollCard = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);
  const [likes, setLikes] = useState(poll.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleVote = () => {
    if (selectedOption !== null) {
      // In real app: Send vote to backend
      poll.options[selectedOption].votes += 1;
      setVoted(true);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => prev + (liked ? -1 : 1));
  };

  const getTotalVotes = () =>
    poll.options.reduce((acc, option) => acc + option.votes, 0);

  const getPercentage = (count) =>
    getTotalVotes() === 0 ? 0 : ((count / getTotalVotes()) * 100).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white border border-amber-700 rounded-xl p-5 shadow-md w-full max-w-xl mx-auto mb-6">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>👤 {poll.author}</span>
        <span>🕒 {formatDistanceToNow(new Date(poll.createdAt))} ago</span>
      </div>

      <h2 className="text-lg font-bold text-yellow-400 mb-4">
        {poll.question}
      </h2>

      {poll.options.map((option, index) => (
        <div key={index} className="mb-3">
          {voted ? (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{option.label}</span>
                <span className="text-amber-300">
                  {getPercentage(option.votes)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${getPercentage(option.votes)}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`poll-${poll.id}`}
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                className="accent-amber-500"
              />
              <span>{option.label}</span>
            </label>
          )}
        </div>
      ))}

      {!voted && (
        <button
          onClick={handleVote}
          disabled={selectedOption === null}
          className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md disabled:opacity-50"
        >
          Vote
        </button>
      )}

      <div className="flex justify-between items-center mt-5 text-sm">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-amber-400"
        >
          <Heart size={16} className={liked ? "fill-amber-400" : ""} />
          {likes} Likes
        </button>
        <div className="flex items-center gap-1 text-gray-300">
          <MessageCircle size={16} />
          {poll.comments.length} Comments
        </div>
      </div>

      {poll.comments.length > 0 && (
        <div className="mt-4 border-t border-gray-700 pt-2 text-sm text-gray-300">
          {poll.comments.map((comment, idx) => (
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

export default PollCard;
