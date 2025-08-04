import { useState } from "react";

const postTypes = [
  "Showcase",
  "Achievement",
  "Snippet",
  "Job Post",
  "Hiring",
  "Challenge",
  "Poll",
  "Q&A",
  "Tech Opinion",
  "Open Source",
];

const CreatePost = () => {
  const [selectedTab, setSelectedTab] = useState("Showcase");

  const renderForm = () => {
    switch (selectedTab) {
      case "Showcase":
        return <ShowcaseForm />;
      case "Snippet":
        return <SnippetForm />;
      case "Achievement":
        return <AchievementForm />;
      case "Job Hiring":
        return <JobHiringForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-slate-200">
      {/* Tab Slider */}

      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border-amber-700 border mb-3 p-3 rounded-lg shadow-sm">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="inline-flex space-x-2">
            {postTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedTab(type)}
                className={`inline-block text-sm font-medium px-4 py-1 mx-1 rounded-full transition duration-200 shadow-sm hover:scale-105 ${
                  selectedTab === type
                    ? "bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:to-amber-700"
                    : "bg-slate-800 hover:bg-slate-700 text-amber-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Form */}
      <div className="bg-slate-950 p-4 rounded-xl border border-amber-700 shadow-md transition-all">
        {renderForm()}
      </div>
    </div>
  );
};

export default CreatePost;

// ─── Post Forms ──────────────────────

const ShowcaseForm = () => (
  <form className="space-y-4">
    <input
      type="text"
      placeholder="Title"
      className="w-full p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm"
    />

    <textarea
      rows="4"
      placeholder="Describe your showcase..."
      className="w-full mt-2 p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 shadow-inner outline-none focus:border-purple-600 focus:border-2 transition-colors duration-200 text-sm"
    />

    <button
      className="inline-block font-medium px-4 py-1 mx-1 rounded-full transition duration-200 shadow-sm hover:scale-105
              bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:to-amber-700"
    >
      Post Showcase
    </button>
  </form>
);
const SnippetForm = () => (
  <form className="space-y-4">
    <input
      type="text"
      placeholder="Snippet Title"
      className="w-full p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 
                 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 
                 shadow-inner outline-none focus:border-purple-600 focus:border-2 
                 transition-colors duration-200 text-sm"
    />

    <textarea
      rows="4"
      placeholder="Enter code snippet..."
      className="w-full p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 
                 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 
                 shadow-inner outline-none focus:border-purple-600 focus:border-2 
                 transition-colors duration-200 text-sm font-mono"
    />

    <button
      className="inline-block font-medium px-4 py-1 mx-1 rounded-full transition duration-200 
                 shadow-sm hover:scale-105 bg-gradient-to-br from-amber-700 via-amber-600 
                 to-yellow-500 text-slate-900 hover:to-amber-700"
    >
      Post Snippet
    </button>
  </form>
);

import { Trophy, Calendar, Link as LinkIcon } from "lucide-react";

const AchievementForm = () => (
  <form className="space-y-4 text-slate-200">
    {/* Title */}
    <div
      className="flex items-center border border-slate-600 rounded-md px-3 py-2 
                    focus-within:border-purple-600 focus-within:border-2 
                    transition-all duration-200"
    >
      <Trophy className="w-4 h-4 text-amber-400 mr-2" />
      <input
        type="text"
        placeholder="Achievement Title (e.g. Hackathon Winner)"
        className="bg-transparent outline-none w-full text-sm placeholder-amber-400"
      />
    </div>

    {/* Date */}
    <div
      className="flex items-center border border-slate-600 rounded-md px-3 py-2 
                    focus-within:border-purple-600 focus-within:border-2 
                    transition-all duration-200"
    >
      <Calendar className="w-4 h-4 text-amber-400 mr-2" />
      <input
        type="date"
        className="bg-transparent outline-none w-full text-sm text-slate-200"
      />
    </div>

    {/* Description */}
    <div
      className="border border-slate-600 rounded-md px-3 py-2 
                    focus-within:border-purple-600 focus-within:border-2 
                    transition-all duration-200"
    >
      <textarea
        rows="4"
        placeholder="Tell us more about this achievement, what you did, what you learned..."
        className="bg-transparent outline-none w-full text-sm placeholder-amber-400 
                   resize-none text-slate-200"
      />
    </div>

    {/* Proof/Link */}
    <div
      className="flex items-center border border-slate-600 rounded-md px-3 py-2 
                    focus-within:border-purple-600 focus-within:border-2 
                    transition-all duration-200"
    >
      <LinkIcon className="w-4 h-4 text-amber-400 mr-2" />
      <input
        type="url"
        placeholder="Optional: Add a link to certificate, repo, or post"
        className="bg-transparent outline-none w-full text-sm placeholder-amber-400"
      />
    </div>

    {/* Submit */}
    <div className="pt-2">
      <button
        type="submit"
        className="inline-block font-medium px-6 py-2 rounded-full transition duration-200 
                   shadow-md hover:scale-105 bg-gradient-to-br from-amber-700 via-amber-600 
                   to-yellow-500 text-slate-900 hover:to-amber-700"
      >
        🚀 Share Achievement
      </button>
    </div>
  </form>
);

const JobHiringForm = () => (
  <form className="space-y-4">
    <input
      type="text"
      placeholder="Job Title"
      className="w-full p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 
                 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 
                 shadow-inner outline-none focus:border-purple-600 focus:border-2 
                 transition-colors duration-200 text-sm"
    />

    <input
      type="text"
      placeholder="Company Name"
      className="w-full p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 
                 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 
                 shadow-inner outline-none focus:border-purple-600 focus:border-2 
                 transition-colors duration-200 text-sm"
    />

    <textarea
      rows="4"
      placeholder="Job Description"
      className="w-full p-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 
                 text-amber-300 placeholder-amber-400 rounded-md border border-amber-700 
                 shadow-inner outline-none focus:border-purple-600 focus:border-2 
                 transition-colors duration-200 text-sm"
    />

    <button
      className="inline-block font-medium px-4 py-1 mx-1 rounded-full transition duration-200 
                 shadow-sm hover:scale-105 bg-gradient-to-br from-amber-700 via-amber-600 
                 to-yellow-500 text-slate-900 hover:to-amber-700"
    >
      Post Job
    </button>
  </form>
);
