import PostHeader from "./PostHeader";
import PostAction from "./PostAction";
import PostTags from "./PostTags";

const ChallengeCard = () => {
  const challenge = {
    id: "challenge1",
    title: "30 Days Coding Challenge",
    description:
      "Join this challenge to solve one coding problem every day for 30 days. Improve your problem-solving and coding skills consistently!",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    difficulty: "Medium",
    rewards: "Certificate, Swag, and Job Referrals",
    link: "https://example.com/30-days-coding-challenge",
    tags: ["Coding", "Challenge", "Consistency", "Problem Solving"],
  };

  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader />

      <div className="m-3 space-y-1">
        {/* Title */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">🎯 Challenge:</span>{" "}
          {challenge.title}
        </p>

        {/* Start Date */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📅 Start Date:</span>{" "}
          {challenge.startDate}
        </p>

        {/* End Date */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">⏰ End Date:</span>{" "}
          {challenge.endDate}
        </p>

        {/* Rewards */}
        {challenge.rewards && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">🏅 Rewards:</span>{" "}
            {challenge.rewards}
          </p>
        )}

        {/* Link */}
        {challenge.link && (
          <p className="text-sm text-blue-400">
            ➡️{" "}
            <a
              href={challenge.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Apply Challenge
            </a>
          </p>
        )}
        {/* Description */}
        <p className="text-sm text-slate-300">{challenge.description}</p>
        {/* Tags */}
        <PostTags tags={challenge.tags} />
      </div>

      <hr className="border-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default ChallengeCard;
