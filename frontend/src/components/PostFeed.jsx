import { useState } from "react";
import { posts } from "../utils/posts";

import ShowcaseCard from "./ShowcaseCard";
import AchievementPost from "./AchievementPost";
import JobPostCard from "./JobPostCard";
import PollCard from "./PollCard";
import QACard from "./QACard";
// import SnippetCard from "./SnippetCard";

const PostFeed = () => {
  const [selectedType, setSelectedType] = useState("All");

  const renderPostByType = (post) => {
    switch (post.type) {
      case "Achievement":
        return <AchievementPost key={post.id} post={post} />;
      case "Showcase":
        return <ShowcaseCard key={post.id} showcase={post} />;
      case "Job Post":
        return <JobPostCard key={post.id} job={post} />;
      case "Poll":
        return <PollCard key={post.id} poll={post} />;
      case "Q&A":
        return <QACard key={post.id} post={post} />;
      // case "Snippet":
      //   return <SnippetCard key={post.id} snippet={post} />;
      default:
        return null;
    }
  };

  const filteredPosts =
    selectedType === "All"
      ? posts
      : posts.filter((post) => post.type === selectedType);

  return (
    <div className="space-y-3 relative">
      {/* Filter Buttons */}
      <div className="sticky top-0 z-30 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border-amber-700 border p-3 rounded-lg shadow-sm">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            "All",
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
          ].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedType(item)}
              className={`inline-block text-sm font-medium px-4 py-1 mx-1 rounded-full transition duration-200 shadow-sm hover:scale-105 ${
                selectedType === item
                  ? "bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:to-amber-700"
                  : "bg-slate-800 hover:bg-slate-700 text-amber-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => renderPostByType(post))
      ) : (
        <div className="text-center text-amber-300 italic py-6">
          No posts available for "{selectedType}"
        </div>
      )}
    </div>
  );
};

export default PostFeed;
