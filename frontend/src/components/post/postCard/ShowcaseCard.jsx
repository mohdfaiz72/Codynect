import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const ShowcaseCard = ({ showcase }) => {
  return (
    <div className="border border-amber-700 p-4 rounded-md bg-gradient-to-br from-purple-950/50 via-slate-900 to-gray-900 shadow-md">
      <PostHeader createdAt={showcase.createdAt} user={showcase.user} />
      <div className="m-3 space-y-1">
        {/* Project Name */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">💡 Project Name:</span>{" "}
          {showcase.projectName}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📝 Description:</span>{" "}
          {showcase.description}
        </p>
        {/* Tech Stack */}
        {showcase.techStack?.length > 0 && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">🛠️ Tech Stack:</span>{" "}
            {showcase.techStack.map((tech, tidx) => (
              <span
                key={tidx}
                className="bg-amber-700/70 text-xs px-2 py-0.5 rounded-full text-amber-100 mx-1"
              >
                {tech}
              </span>
            ))}
          </p>
        )}
        {/* Optional Duration */}
        {showcase.duration && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">⏳ Duration:</span>{" "}
            {showcase.duration}
          </p>
        )}

        {/* View Project Link */}
        {showcase.link && (
          <p className="text-sm text-blue-400">
            🔗{" "}
            <a
              href={showcase.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View Project
            </a>
          </p>
        )}

        {/* Tags */}
        <PostTags tags={showcase.tags} />
      </div>
      <hr className="text-amber-700 mb-3" />
      <PostAction
        postId={showcase._id}
        postType={showcase.type}
        likesCount={showcase.likesCount}
        isLiked={showcase.isLiked}
      />
    </div>
  );
};

export default ShowcaseCard;
