import CodeBlock from "./CodeBlock";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const SnippetCard = ({ snippet }) => {
  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader createdAt={snippet.createdAt} user={snippet.user} />

      {/* Title + Link */}
      <div className="m-3 space-y-1">
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">🎯 Problem:</span>{" "}
          {snippet.title}
        </p>

        {/* Intuition */}
        {snippet.intuition && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">🧠 Intuition:</span>{" "}
            {snippet.intuition}
          </p>
        )}

        {/* Approach */}
        {snippet.approach && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">🚀 Approach:</span>{" "}
            {snippet.approach}
          </p>
        )}

        {/* Meta Info */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">
            📊 Time Complexity:
          </span>{" "}
          {snippet.timeComplexity}
        </p>
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">
            📦 Space Complexity:
          </span>{" "}
          {snippet.spaceComplexity}
        </p>
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">⚙️ Language:</span>{" "}
          {snippet.language}
        </p>

        {snippet.link && (
          <p className="text-sm text-blue-400">
            🔗{" "}
            <a
              href={snippet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:underline"
            >
              View Problem
            </a>
          </p>
        )}

        {/* Tags */}
        <PostTags tags={snippet.tags} />
      </div>
      {/* Code */}
      {snippet.code && snippet.code.trim() !== "" && (
        <CodeBlock code={snippet.code} language={snippet.language} />
      )}
      <hr className="border-amber-700 mb-3" />
      <PostAction
        postId={snippet._id}
        postType={snippet.type}
        likesCount={snippet.likesCount}
        isLiked={snippet.isLiked}
        commentsCount={snippet.commentsCount}
      />
    </div>
  );
};

export default SnippetCard;
