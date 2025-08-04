import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { useState } from "react";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-[85vh] border border-amber-700 rounded-lg mx-4 mt-4 overflow-hidden">
      <ConversationList
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatWindow chat={selectedChat} />
    </div>
  );
};

export default ChatPage;
