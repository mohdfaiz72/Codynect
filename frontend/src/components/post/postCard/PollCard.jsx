import { useState } from "react";
import PostHeader from "./PostHeader";
import PostAction from "./PostAction";

const PollCard = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);
  const [likes, setLikes] = useState(poll.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleVote = () => {
    if (selectedOption !== null) {
      poll.options[selectedOption].votes += 1;
      setVoted(true);
    }
  };

  const getTotalVotes = () =>
    poll.options.reduce((acc, option) => acc + option.votes, 0);

  const getPercentage = (count) =>
    getTotalVotes() === 0 ? 0 : ((count / getTotalVotes()) * 100).toFixed(1);

  return (
    <div className="border border-amber-700 p-4 rounded-md bg-gradient-to-br from-purple-950/50 via-slate-900 to-gray-900 shadow-md">
      <PostHeader />
      <div className="m-3">
        <h2 className="text-1xl font-bold text-amber-400 mb-3">
          ❓ {poll.question}
        </h2>

        {poll.options.map((option, index) => (
          <div key={index} className="pb-3">
            {voted ? (
              <div>
                <div className="flex justify-between text-sm mb-1 text-slate-200">
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
              <label className="flex items-center space-x-2 cursor-pointer text-slate-200">
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
            className="mx-auto flex items-center px-6 py-1.5 font-medium text-slate-900 rounded-full text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 hover:from-amber-800 hover:to-amber-700 shadow-md hover:scale-105 transition duration-200 disabled:opacity-50"
          >
            Vote
          </button>
        )}
      </div>

      <hr className="text-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default PollCard;
