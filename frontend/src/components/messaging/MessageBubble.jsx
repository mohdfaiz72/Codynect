const MessageBubble = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-xl shadow transition-all duration-200 text-sm font-medium ${
          isMe
            ? "bg-amber-600/80 text-slate-200 rounded-br-none"
            : "bg-purple-800/70 text-slate-200 rounded-bl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
