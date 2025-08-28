import PostHeader from "./PostHeader";
import PostAction from "./PostAction";
import PostTags from "./PostTags";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      {/* Header with user and createdAt */}
      <PostHeader createdAt={article.createdAt} user={article.user} />

      <div className="m-3 space-y-1">
        {/* Title */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📌 Title:</span>{" "}
          {article.title}
        </p>

        {/* Content */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📝 Content:</span>{" "}
          {article.content}
        </p>

        {/* External Link */}
        {article.externalLink && (
          <p className="text-sm text-blue-400">
            🔗{" "}
            <a
              href={article.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Read more
            </a>
          </p>
        )}

        {/* Tags */}
        <PostTags tags={article.tags} />
      </div>

      {article.image && (
        <img
          src={article.image}
          alt="Thought"
          className="w-full my-3 rounded-md border border-slate-700 shadow-sm"
        />
      )}

      <hr className="border-amber-700 mb-3" />

      {/* Actions like Like, Comment, Share */}
      <PostAction
        postId={article._id}
        postType={article.type}
        likesCount={article.likesCount}
        isLiked={article.isLiked}
        commentsCount={article.commentsCount}
      />
    </div>
  );
};

export default ArticleCard;
