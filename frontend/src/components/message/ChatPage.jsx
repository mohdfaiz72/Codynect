import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Loader from "../../components/common/Loader";
import { BASE_URL } from "../../utils/constants";
import { getSocket } from "../../utils/socket";
import {
  addConversation,
  updateConversationOnNewMessage,
} from "../../store/conversationSlice";

const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const { conversation, selectedChatId } = useSelector(
    (store) => store.conversation
  );
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // This effect fetches a single user if they are selected but not in our list
  useEffect(() => {
    const fetchUserById = async (userId) => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/v1/message/${userId}`, {
          withCredentials: true,
        });
        setChat(res.data);
        dispatch(addConversation(res.data));
      } catch (err) {
        console.error("Failed to fetch user by ID", err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChatId) {
      const exists = conversation.some((conv) => conv.id === selectedChatId);
      if (!exists) {
        fetchUserById(selectedChatId);
      } else {
        setLoading(false);
      }
    }
  }, [selectedChatId, conversation]);

  // This effect handles real-time message updates from the socket
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !user?._id) return;

    const handleConversationUpdate = (newMessage) => {
      const otherUserId =
        newMessage.sender === user._id
          ? newMessage.receiver
          : newMessage.sender;

      // Use the correct reducer to update an existing conversation
      dispatch(
        updateConversationOnNewMessage({
          otherUserId,
          content: newMessage.content,
          createdAt: newMessage.createdAt,
        })
      );
    };

    socket.on("receive-message", handleConversationUpdate);

    return () => {
      socket.off("receive-message", handleConversationUpdate);
    };
  }, [user?._id, dispatch]);

  const selectedChat = useMemo(() => {
    if (!selectedChatId) return null;
    return conversation.find((conv) => conv.id === selectedChatId) || null;
  }, [selectedChatId, conversation]);

  return (
    <div className="flex h-[85vh] border border-amber-700 rounded-lg mx-4 mt-4 overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : (
        <>
          <ConversationList
            selectedChatId={selectedChatId}
            conversation={conversation}
            onChat={setChat}
          />
          <ChatWindow chat={selectedChat} />
        </>
      )}
    </div>
  );
};

export default ChatPage;
