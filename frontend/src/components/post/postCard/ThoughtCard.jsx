import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const ThoughtCard = ({ thought }) => {
  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-md bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      {/* Author and timestamp */}
      <PostHeader createdAt={thought.createdAt} user={thought.user} />
      <div className="m-3 space-y-1">
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">💭 Thought:</span>{" "}
          {thought.content}
        </p>
        {/* Tags */}
        <PostTags tags={thought.tags} />
      </div>
      {thought.image && (
        <img
          src={thought.image}
          alt="Thought"
          className="w-full my-3 rounded-md border border-slate-700 shadow-sm"
        />
      )}
      <hr className="text-amber-700 mb-3" />
      <PostAction
        postId={thought._id}
        postType={thought.type}
        likesCount={thought.likesCount}
        isLiked={thought.isLiked}
        commentsCount={thought.commentsCount}
      />
    </div>
  );
};

export default ThoughtCard;
