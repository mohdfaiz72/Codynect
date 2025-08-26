import PostHeader from "./PostHeader";
import PostAction from "./PostAction";
import PostTags from "./PostTags";

const AchievementPost = ({ achievement }) => {
  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader createdAt={achievement.createdAt} user={achievement.user} />

      <div className="m-3 space-y-1">
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">🏆 Title:</span>{" "}
          {achievement.title}
        </p>

        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📝 Description:</span>{" "}
          {achievement.description}
        </p>

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
      <PostAction
        postId={achievement._id}
        postType={achievement.type}
        likesCount={achievement.likesCount}
        isLiked={achievement.isLiked}
      />
    </div>
  );
};

export default AchievementPost;
