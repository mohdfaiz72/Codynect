import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../common/Loader";
import { BASE_URL } from "../../utils/constants";
import { setConversation } from "../../store/conversationSlice";

const ChatPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [chat, setChat] = useState(null);

  const { conversation, selectedChat } = useSelector(
    (store) => store.conversation
  );
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    setInitialLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/message/conversations`, {
        withCredentials: true,
      });
      dispatch(setConversation(res.data));
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchUserById = async (userId) => {
    setInitialLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/message/${userId}`, {
        withCredentials: true,
      });
      if (!conversation.some((conv) => conv.id === res.data.id)) {
        setChat(res.data);
        dispatch(setConversation([...conversation, res.data]));
      }
    } catch (err) {
      console.error("Failed to fetch user by ID", err);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (
      selectedChat &&
      !conversation.some((conv) => conv.id === selectedChat)
    ) {
      fetchUserById(selectedChat);
    }
  }, [selectedChat, conversation]);

  return (
    <div className="flex h-[85vh] border border-amber-700 rounded-lg mx-4 mt-4 overflow-hidden">
      {initialLoading ? (
        <div className="flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : (
        <>
          <ConversationList
            selectedChat={selectedChat}
            conversation={conversation}
            onChat={setChat}
          />
          <ChatWindow chat={chat} />
        </>
      )}
    </div>
  );
};

export default ChatPage;
