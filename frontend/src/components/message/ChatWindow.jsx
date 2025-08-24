import { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { dummyUser } from "../../utils/dummyUser";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [chatLoading, setchatLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chat?.id) return;
      setchatLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/v1/message/get-message/${chat.id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setchatLoading(false);
      }
    };

    fetchMessages();
  }, [chat?.id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!chat) {
    return (
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-br from-purple-950/50 via-slate-900 to-gray-900 text-slate-200">
        Select a conversation to start chatting
      </div>
    );
  }

  if (chatLoading) {
    return (
      <div className="w-2/3 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col justify-between bg-slate-950/90">
      {/* Header */}
      <div className="p-4 border-b border-amber-700 bg-gradient-to-br from-purple-950/70 via-slate-900 to-gray-900 flex items-center gap-4">
        <img
          src={chat.profileImage || dummyUser.profileImage}
          alt={`${chat.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover border border-purple-600"
        />
        <h2 className="text-xl font-semibold text-amber-400">{chat.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {messages.length === 0 ? (
          <p className="text-slate-400">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={{
                id: msg._id,
                receiver: msg.receiver === chat.id ? "them" : "me",
                text: msg.content,
              }}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onMessageSent={setMessages} />
    </div>
  );
};

export default ChatWindow;
