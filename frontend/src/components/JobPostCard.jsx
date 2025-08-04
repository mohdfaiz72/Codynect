import {
  Briefcase,
  MapPin,
  CalendarDays,
  Send,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const JobPostCard = ({ job }) => {
  const [liked, setLiked] = useState(job.likedByUser || false);
  const [likesCount, setLikesCount] = useState(job.likes || 0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 p-4 rounded-xl border border-amber-700 shadow-md mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-amber-400">{job.title}</h3>
        <span className="text-xs text-slate-400">{job.type || "Job Post"}</span>
      </div>

      {/* Company */}
      <p className="text-sm text-slate-300 flex items-center">
        <Briefcase className="w-4 h-4 mr-1 text-amber-500" />
        {job.company}
      </p>

      {/* Location */}
      <p className="text-sm text-slate-400 flex items-center">
        <MapPin className="w-4 h-4 mr-1 text-amber-500" />
        {job.location}
      </p>

      {/* Date */}
      <p className="text-sm text-slate-400 flex items-center">
        <CalendarDays className="w-4 h-4 mr-1 text-amber-500" />
        {new Date(job.createdAt).toDateString()}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {job.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-slate-800 text-xs text-amber-300 px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300 mt-3 line-clamp-3">
        {job.description}
      </p>

      {/* Action Footer */}
      <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1 ${
              liked ? "text-amber-400" : "text-slate-400"
            }`}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
            {likesCount}
          </button>

          <span className="flex items-center gap-1">
            <MessageCircle size={16} />
            {job.comments?.length || 0}
          </span>
        </div>

        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-amber-300 hover:underline"
        >
          Apply Now <Send className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default JobPostCard;
