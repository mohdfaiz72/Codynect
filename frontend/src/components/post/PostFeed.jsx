import { useState, useEffect } from "react";
//import { posts } from "../../utils/posts";

import ShowcaseCard from "./postCard/ShowcaseCard";
import AchievementPost from "./postCard/AchievementCard";
import JobCard from "./postCard/JobCard";
import PollCard from "./postCard/PollCard";
import ThoughtCard from "./postCard/ThoughtCard";
import SnippetCard from "./postCard/SnippetCard";
import ChallengeCard from "./postCard/ChallengeCard";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store/postSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Loader from "../../common/Loader";

const postTypes = [
  "All",
  "Showcase",
  "Achievement",
  "Snippet",
  "Jobs",
  "Challenge",
  "Poll",
  "Thought",
];

const PostFeed = () => {
  const [loading, setLoading] = useState(false);
  const posts = useSelector((store) => store.post.post);
  const dispatch = useDispatch();

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/post/get-feed`, {
        withCredentials: true,
      });
      dispatch(setPost(res.data.data));
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const [selectedType, setSelectedType] = useState("All");

  const renderPostByType = (post) => {
    switch (post.type) {
      // case "Achievement":
      // return <AchievementPost key={post.id} post={post} />;
      case "Showcase":
        return <ShowcaseCard key={post._id} showcase={post} />;
      // case "Jobs":
      //   return <JobCard key={post.id} job={post} />;
      case "Poll":
        return <PollCard key={post._id} poll={post} />;
      case "Thought":
        return <ThoughtCard key={post._id} thought={post} />;
      case "Snippet":
        return <SnippetCard key={post._id} snippet={post} />;
      // case "Challenge":
      //   return <ChallengeCard key={post.id} challenge={post} />;
      default:
        return null;
    }
  };

  const filteredPosts =
    selectedType === "All"
      ? posts
      : posts.filter((post) => post.type === selectedType);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-3 relative">
      {/* Filter Buttons */}
      <div className="sticky top-0 z-30 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border-amber-700 border p-3 rounded-lg shadow-sm">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          {postTypes.map((item) => (
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
        <div className="text-center text-slate-400 italic py-6">
          No posts available for "{selectedType}"
        </div>
      )}
    </div>
  );
};

export default PostFeed;
