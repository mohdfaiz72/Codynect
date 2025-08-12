import PostHeader from "./PostHeader";
import PostAction from "./PostAction";
import PostTags from "./PostTags";

const AchievementPost = () => {
  const achievement = {
    title: "Completed Google Summer of Code 2025",
    description:
      "Successfully contributed to open-source projects, gained valuable experience in software development, and collaborated with a global community.",
    date: "2025-08-10T10:00:00Z",
    tags: ["Dynamic Programming", "Combinatorics", "Math"],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080&auto=format&fit=crop",
  };

  const formattedDate = new Date(achievement.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader />

      <div className="m-3 space-y-1">
        <p className="text-sm text-slate-300 flex items-center gap-2">
          <span className="font-medium text-amber-300">🏆 Title:</span>{" "}
          {achievement.title}
        </p>

        <p className="text-sm text-slate-300">{achievement.description}</p>
        <PostTags tags={achievement.tags} />
      </div>
      {achievement.image && (
        <img
          src={achievement.image}
          alt="Achiement"
          className="w-full my-3 rounded-md border border-slate-700 shadow-sm"
        />
      )}
      <hr className="border-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default AchievementPost;
