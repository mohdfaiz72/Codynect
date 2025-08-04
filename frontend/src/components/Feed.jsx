import PostCard from "./PostCard";

const Feed = ({ filter }) => {
  const dummyPosts = [
    {
      title: "Build a Portfolio",
      type: "Project",
      author: "Faiz",
      description: "A MERN app for devs",
    },
    {
      title: "Why Tailwind?",
      type: "Blog",
      author: "Amit",
      description: "Opinion on styling libraries",
    },
  ];

  const posts =
    filter === "All" ? dummyPosts : dummyPosts.filter((p) => p.type === filter);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default Feed;
