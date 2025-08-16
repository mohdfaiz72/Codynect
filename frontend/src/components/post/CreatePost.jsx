import { useState } from "react";
import ThoughtForm from "./createPost/ThoughtForm";
import JobForm from "./createPost/JobForm";
import SnippetForm from "./createPost/SnippetForm";
import ShowcaseForm from "./createPost/ShowcaseForm";
import AchievementForm from "./createPost/AchievementForm";
import PollForm from "./createPost/PollForm";
import ArticleForm from "./createPost/ArticleForm";
import DoubtForm from "./createPost/DoubtForm";

const postTypes = [
  "Thought",
  "Showcase",
  "Achievement",
  "Snippet",
  "Jobs",
  "Article",
  "Doubt",
  "Poll",
];
const CreatePost = () => {
  const [selectedTab, setSelectedTab] = useState("Thought");

  const renderForm = () => {
    switch (selectedTab) {
      case "Achievement":
        return <AchievementForm />;
      case "Showcase":
        return <ShowcaseForm />;
      case "Jobs":
        return <JobForm />;
      case "Poll":
        return <PollForm />;
      case "Thought":
        return <ThoughtForm />;
      case "Snippet":
        return <SnippetForm />;
      case "Article":
        return <ArticleForm />;
      case "Doubt":
        return <DoubtForm />;
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

      {renderForm()}
    </div>
  );
};

export default CreatePost;
