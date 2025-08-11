import { useState, useEffect, useCallback } from "react";
import { getSocket } from "../../utils/socket";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";

const getChatId = (userId1, userId2) => {
  if (!userId1 || !userId2) return null;
  return [userId1, userId2].sort().join("--");
};

const MessageInput = ({ onMessageSent }) => {
  const [message, setMessage] = useState("");

  const { selectedChatId } = useSelector((store) => store.conversation);
  const { user } = useSelector((store) => store.user);

  const handleReceiveMessage = useCallback(
    (data) => {
      const chatId1 = getChatId(user._id, selectedChatId);
      const chatId2 = getChatId(data.sender, data.receiver);
      if (chatId1 !== chatId2) return;
      onMessageSent((prev) => {
        if (prev.some((msg) => msg._id === data._id)) {
          return prev;
        }
        return [...prev, data];
      });
    },
    [onMessageSent]
  );

  useEffect(() => {
    if (!user?._id || !selectedChatId) return;

    const chatId = getChatId(user._id, selectedChatId);
    if (!chatId) return;

    const socket = getSocket();
    if (!socket) {
      console.error("Socket connection not established yet");
      return;
    }

    socket.emit("join-chat", chatId);
    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [selectedChatId, user?._id, handleReceiveMessage]);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    if (!selectedChatId || !user?._id) return;

    const chatId = getChatId(user._id, selectedChatId);
    if (!chatId) return;

    const socket = getSocket();
    if (!socket || !socket.connected) {
      console.error("Socket not connected");
      return;
    }

    const payload = {
      text: trimmedMessage,
      receiverId: selectedChatId,
      chatId,
    };

    socket.emit("send-message", payload);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
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
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="w-full bg-transparent outline-none text-slate-200 placeholder-amber-400 text-sm"
        />
      </div>

      {/* Send Button Outside */}
      <button
        onClick={handleSendMessage}
        className="hover:text-amber-200 hover:scale-110 transition-transform cursor-pointer text-amber-400"
      >
        <Send />
      </button>
    </div>
  );
};

export default MessageInput;
