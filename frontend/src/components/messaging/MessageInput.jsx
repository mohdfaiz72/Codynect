import { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Send:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center gap-2 mx-4 mb-4">
      {/* Input Box */}
      <div className="flex-1 border border-amber-700 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 px-3 py-2 rounded-md shadow-inner focus-within:border-purple-600 focus-within:border-2 transition-colors duration-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full bg-transparent outline-none text-slate-200 placeholder-amber-400 text-sm"
        />
      </div>

      {/* Send Button Outside */}
      <button
        onClick={handleSend}
        className="hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer text-amber-400"
      >
        <Send />
      </button>
    </div>
  );
};

export default MessageInput;
