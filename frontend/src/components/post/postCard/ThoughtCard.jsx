import PostAction from "./PostAction";
import PostHeader from "./PostHeader";

const ThoughtCard = () => {
  const thought = {
    author: {
      name: "Jane Doe",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content:
      "Just had a breakthrough on my project! Feeling motivated. Remote work has transformed how I approach productivity and work-life balance. Loving the flexibility! 🌍✨",
    category: ["learning", "life", "thought"],
    createdAt: "2025-08-11T14:30:00Z",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080&auto=format&fit=crop",
  };

  const { author, content, category, createdAt, image } = thought;

  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-md bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      {/* Author and timestamp */}
      <PostHeader />

      {/* Thought content */}
      <p className="text-gray-800 text-sm dark:text-gray-200 whitespace-pre-wrap m-3">
        {content}
      </p>
      <div className="flex flex-wrap gap-2 m-3">
        {category.map((tag, i) => (
          <span
            key={i}
            className="bg-slate-800 text-xs text-amber-300 px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      {image && (
        <img
          src={image}
          alt="Thought visual"
          className="w-full rounded-md my-3 object-cover max-h-64"
        />
      )}
      <hr className="text-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default ThoughtCard;
