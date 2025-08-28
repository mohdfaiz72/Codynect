import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import Loader from "../../components/common/Loader";
import { dummyUser } from "../../utils/dummyUser";
import api from "../../utils/api";

const ChatWindow = ({ chat, setShowChat }) => {
  const [messages, setMessages] = useState([]);
  const [chatLoading, setchatLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chat?.id) return;
      setchatLoading(true);
      try {
        const res = await api.get(`/v1/message/get-message/${chat.id}`);
        {
          console.log(res.data);
        }
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
      <div className="md:w-2/3 w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const formatDateLabel = (date) => {
    const today = new Date();
    const msgDate = new Date(date);

    if (msgDate.toDateString() === today.toDateString()) return "Today";

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";

    return format(msgDate, "MMMM d, yyyy");
  };

  return (
    <div className="md:w-2/3 w-full flex flex-col justify-between bg-slate-950/90">
      {/* Header */}
      <div className="p-4 border-b border-amber-700 bg-gradient-to-br from-purple-950/70 via-slate-900 to-gray-900 flex items-center gap-4">
        <img
          src={chat.profileImage || dummyUser.profileImage}
          alt={`${chat.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover border border-purple-600"
        />
        <h2 className="text-xl font-semibold text-amber-400">{chat.name}</h2>
        <button
          onClick={() => setShowChat(false)}
          className="ml-auto text-amber-400 hover:text-amber-200 hover:scale-110 transition-transform block md:hidden"
          title="Back to Profile"
        >
          <ArrowLeft size={22} className="mr-2" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {messages.length === 0 ? (
          <p className="text-slate-400">No messages yet</p>
        ) : (
          messages.map((msg, i) => {
            const showDate =
              i === 0 ||
              new Date(msg.createdAt).toDateString() !==
                new Date(messages[i - 1].createdAt).toDateString();

            return (
              <div key={msg._id}>
                {showDate && (
                  <div className="block w-max text-center text-xs px-4 mx-auto py-1.5 rounded-full border border-amber-600 text-amber-300 bg-slate-800">
                    {formatDateLabel(msg.createdAt)}
                  </div>
                )}

                <MessageBubble
                  message={{
                    id: msg._id,
                    receiver: msg.receiver === chat.id ? "them" : "me",
                    text: msg.content,
                    createdAt: msg.createdAt,
                  }}
                />
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onMessageSent={setMessages} />
    </div>
  );
};

export default ChatWindow;
