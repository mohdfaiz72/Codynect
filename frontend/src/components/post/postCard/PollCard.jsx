import { useState } from "react";
import PostHeader from "./PostHeader";
import PostAction from "./PostAction";
import PostTags from "./PostTags";

const PollCard = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);
  const [options, setOptions] = useState(poll.options);

  const handleVote = () => {
    if (selectedOption !== null) {
      // Create a copy of options to update votes
      const updatedOptions = options.map((opt, idx) =>
        idx === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      );
      setOptions(updatedOptions);
      setVoted(true);

      // TODO: send vote to backend to persist
      // axios.post(`${BASE_URL}/poll/vote`, { pollId: poll._id, optionIndex: selectedOption })
    }
  };

  const getTotalVotes = () =>
    options.reduce((acc, option) => acc + option.votes, 0);

  const getPercentage = (count) =>
    getTotalVotes() === 0 ? 0 : ((count / getTotalVotes()) * 100).toFixed(1);

  return (
    <div className="border border-amber-700 p-4 rounded-md bg-gradient-to-br from-purple-950/50 via-slate-900 to-gray-900 shadow-md">
      <PostHeader createdAt={poll.createdAt} user={poll.user} />
      <div className="m-3">
        <h2 className="text-1xl font-bold text-amber-400 mb-3">
          ❓ {poll.question}
        </h2>

        {options.map((option, index) => (
          <div key={index} className="pb-3">
            {voted ? (
              <div>
                <div className="flex justify-between text-sm mb-1 text-slate-200">
                  <span>{option.text}</span>
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
              <label className="flex items-center space-x-2 cursor-pointer text-slate-200">
                <input
                  type="radio"
                  name={`poll-${poll._id}`}
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  className="accent-amber-500"
                />
                <span>{option.text}</span>
              </label>
            )}
          </div>
        ))}

        {!voted && (
          <button
            onClick={handleVote}
            disabled={selectedOption === null}
            className="mx-auto flex items-center mb-2 px-6 py-1.5 font-medium text-slate-900 rounded-full text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200 disabled:opacity-50"
          >
            Vote
          </button>
        )}

        <PostTags tags={poll.tags} />
      </div>

      <hr className="text-amber-700 mb-3" />
      <PostAction
        postId={poll._id}
        postType={poll.type}
        likesCount={poll.likesCount}
        isLiked={poll.isLiked}
        commentsCount={poll.commentsCount}
      />
    </div>
  );
};

export default PollCard;
