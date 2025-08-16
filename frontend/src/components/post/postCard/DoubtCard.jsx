import CodeBlock from "./CodeBlock";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const DoubtCard = ({ doubt }) => {
  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader createdAt={doubt.createdAt} user={doubt.user} />

      {/* Title + Content */}
      <div className="m-3 space-y-1">
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">❓ Doubt Title:</span>{" "}
          {doubt.title}
        </p>

        <p className="text-sm text-slate-300 whitespace-pre-line">
          <span className="font-medium text-amber-300">✏️ Details:</span>{" "}
          {doubt.content}
        </p>
        {doubt.code && doubt.code.trim() !== "" && (
          <p className="text-sm text-slate-300 mb-1">
            <span className="font-medium text-amber-300">⚙️ Language:</span>{" "}
            {doubt.language}
          </p>
        )}

        {/* Tags */}
        <PostTags tags={doubt.tags} />
      </div>
      {doubt.code && doubt.code.trim() !== "" && (
        <CodeBlock code={doubt.code} language={doubt.language} />
      )}

      <hr className="border-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default DoubtCard;
