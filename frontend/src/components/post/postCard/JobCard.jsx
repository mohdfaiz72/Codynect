import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const job = {
  id: "job2",
  role: "Full Stack Developer",
  company: "Amazon",
  location: "Bangalore, India",
  eligibility: "2026 passout batch",
  ctc: "₹8–12 LPA",
  createdAt: "2025-08-08T14:30:00Z",
  tags: ["Node.js", "Express", "MongoDB", "React"],
  image: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png",
  applyLink: "https://amazon.jobs/en/jobs/1234567/full-stack-developer",
  description:
    "Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence. Known for innovation and customer obsession, Amazon offers diverse career opportunities across software development, operations, design, and product management.",
};

const JobCard = () => {
  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader />

      <div className="m-3 space-y-1">
        {/* Company */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">📌 Company:</span>{" "}
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

        {/* CTC */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">💰 CTC:</span>{" "}
          {job.ctc || "Not disclosed"}
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
              Apply Here
            </a>
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-slate-300">{job.description}</p>

        {/* Tags */}
        <PostTags tags={job.tags} />
      </div>

      {job.image && (
        <img
          src={job.image}
          alt={`${job.company} logo`}
          className="w-full rounded-md my-3 object-contain max-h-64 bg-white p-4"
        />
      )}

      <hr className="border-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default JobCard;
