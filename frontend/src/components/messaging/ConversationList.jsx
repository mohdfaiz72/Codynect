import { Search } from "lucide-react";

const mockConversations = [
  { id: 1, name: "Faiz", lastMessage: "What's up?" },
  { id: 2, name: "Aisha", lastMessage: "See you tomorrow!" },
  { id: 3, name: "Zoya", lastMessage: "Can we talk later?" },
  { id: 4, name: "Rohan", lastMessage: "I'm on the way." },
  { id: 5, name: "Anaya", lastMessage: "Loved your latest post!" },
  { id: 6, name: "Yusuf", lastMessage: "Don't forget the meeting." },
  { id: 7, name: "Neha", lastMessage: "😂 That meme was crazy!" },
  { id: 8, name: "Aryan", lastMessage: "I’ll send the files soon." },
  { id: 9, name: "Tanya", lastMessage: "Where are you now?" },
  { id: 10, name: "Kunal", lastMessage: "Let’s catch up this weekend." },
];

const ConversationList = ({ onSelectChat, selectedChat }) => {
  return (
    <div className="bg-fixed w-1/3 border-r border-amber-700 overflow-y-auto scrollbar-hide">
      {/* Sticky Header + Search */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 backdrop-blur border-b border-amber-700">
        <h2 className="text-amber-400 text-xl font-bold p-4">Messaging</h2>

        {/* Search Box */}
        <div className="flex items-center mx-4 mb-3 border border-amber-700 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 px-3 py-1 rounded-md shadow-inner focus-within:border-purple-600 focus-within:border-2 transition-colors duration-200">
          <Search className="text-amber-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-slate-100 placeholder-amber-400 w-full text-sm"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="bg-fixed px-4 pb-4 pt-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900">
        {mockConversations.map((conv) => {
          const isSelected = selectedChat?.id === conv.id;
          return (
            <div
              key={conv.id}
              onClick={() => onSelectChat(conv)}
              className={`p-2 mb-2 rounded-xl cursor-pointer transition-all duration-200 group ${
                isSelected ? "bg-purple-900/40" : "hover:bg-purple-800/20"
              }`}
            >
              <div
                className={`text-lg transition-colors duration-200 ${
                  isSelected
                    ? "text-amber-300"
                    : "group-hover:text-amber-300 text-slate-200"
                }`}
              >
                {conv.name}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {conv.lastMessage}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;
