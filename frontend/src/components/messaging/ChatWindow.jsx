import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";

const mockMessages = [
  { id: 1, sender: "me", text: "Hey!" },
  { id: 2, sender: "them", text: "Hi, how are you?" },
  { id: 3, sender: "me", text: "I'm good, thanks!" },
];

const ChatWindow = ({ chat }) => {
  if (!chat) {
    return (
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-br from-purple-950/50 via-slate-900 to-gray-900 text-slate-200">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col justify-between bg-slate-950/90">
      <div className="p-4 border-b border-amber-700 bg-gradient-to-br from-purple-950/70 via-slate-900 to-gray-900">
        <h2 className="text-xl font-semibold text-amber-400">{chat.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatWindow;
