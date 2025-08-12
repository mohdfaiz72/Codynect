const PostTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag, i) => (
        <span
          key={i}
          className="bg-slate-800 text-xs text-amber-300 px-2 py-0.5 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default PostTags;
