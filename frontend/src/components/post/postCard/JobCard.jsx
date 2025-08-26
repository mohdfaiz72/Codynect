import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const JobCard = ({ job }) => {
  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader createdAt={job.createdAt} user={job.user} />

      <div className="m-3 space-y-1">
        {/* Company */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📢 Company:</span>{" "}
          {job.company}
        </p>

        {/* Role */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">💼 Role:</span>{" "}
          {job.role}
        </p>

        {/* Location */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📍 Location:</span>{" "}
          {job.location}
        </p>

        {/* Eligibility */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">🎓 Eligibility:</span>{" "}
          {job.eligibility || "Open to all"}
        </p>

        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">
            💰 Expected {job.salary.type}:
          </span>{" "}
          {job.salary.type === "CTC"
            ? `${job.salary.ctc} LPA`
            : job.salary.type === "Stipend"
            ? `₹${job.salary.stipend.toLocaleString()} / month`
            : "Not disclosed"}
        </p>

        {/* Apply Link */}
        {job.applyLink && (
          <p className="text-sm text-blue-400">
            ➡️{" "}
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:underline"
            >
              Apply Job
            </a>
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-slate-300">{job.description}</p>

        {/* Tags */}
        <PostTags tags={job.tags} />
      </div>
      <hr className="border-amber-700 mb-3" />
      <PostAction
        postId={job._id}
        postType={job.type}
        likesCount={job.likesCount}
        isLiked={job.isLiked}
      />
    </div>
  );
};

export default JobCard;
