const MessageBubble = ({ message }) => {
  const isMe = message.receiver === "them";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-xl shadow transition-all duration-200 text-sm font-medium border ${
          isMe
            ? "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-slate-200 border-amber-400 rounded-br-none"
            : "bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 text-slate-200 border-purple-400 rounded-bl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
