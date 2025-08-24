import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedChatId } from "../../store/conversationSlice";
import { timeAgoFormat } from "../../utils/timeAgoFormat";
import { dummyUser } from "../../utils/dummyUser";

const ConversationList = ({ conversation, onChat, selectedChatId }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-fixed w-1/3 border-r border-amber-700 overflow-y-auto scrollbar-hide">
      {/* Sticky Header + Search */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 backdrop-blur border-b border-amber-700">
        <h2 className="text-amber-400 text-xl font-bold p-4">Messaging</h2>
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
      {conversation.length !== 0 ? (
        <div className="h-full bg-fixed px-4 pb-4 pt-2 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900">
          {conversation.map((conv) => {
            const isSelected = selectedChatId === conv.id;

            return (
              <div
                key={conv.id}
                onClick={() => {
                  dispatch(setSelectedChatId(conv.id));
                  onChat(conv);
                }}
                className={`p-2 mb-2 rounded-xl cursor-pointer transition-all duration-200 group flex gap-3 items-start ${
                  isSelected ? "bg-purple-900/40" : "hover:bg-purple-800/20"
                }`}
              >
                {/* Profile Image */}
                <img
                  src={conv.profileImage || dummyUser.profileImage}
                  alt="profile"
                  className={`w-10 h-10 rounded-full object-cover border ${
                    isSelected ? "border-purple-600" : "border-amber-700"
                  }`}
                />

                {/* Text Info */}
                <div className="flex-1 overflow-hidden">
                  <div
                    className={`text-base font-medium truncate ${
                      isSelected
                        ? "text-amber-300"
                        : "group-hover:text-amber-300 text-slate-200"
                    }`}
                  >
                    {conv.name}
                  </div>

                  {/* Last Message */}
                  <div className="text-sm text-slate-400 truncate">
                    {conv.lastMessage || ""}
                  </div>
                </div>

                {/* Time */}
                {conv.lastMessageTime && (
                  <div className="text-xs text-slate-500 whitespace-nowrap">
                    {timeAgoFormat(conv.lastMessageTime)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-slate-400 p-4">
          No conversations found
        </div>
      )}
    </div>
  );
};

export default ConversationList;
