const MessageBubble = ({ message }) => {
  const isMe = message.receiver === "them";
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`max-w-[90%] px-3 py-1.5 rounded-xl shadow transition-all duration-200 text-sm font-medium border text-slate-300 ${
          isMe
            ? "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 border-amber-400/70 rounded-br-none"
            : "bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 border-purple-400/70 rounded-bl-none"
        }`}
      >
        {message.text}
        <span className="block text-xs text-slate-400 text-right">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
