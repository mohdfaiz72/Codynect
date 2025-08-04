import { useState } from "react";

const Notifications = () => {
  const [selectedType, setSelectedType] = useState("All");

  const sampleNotifications = [
    { type: "Comments", text: "🔔 New comment on your post" },
    { type: "Likes", text: "👍 Someone liked your post" },
    { type: "System", text: "📣 New update from Codynect" },
    { type: "Mentions", text: "💬 You were mentioned in a thread" },
    { type: "Follows", text: "👤 New follower joined your network" },
    { type: "Jobs", text: "💼 New job opportunity posted" },
    { type: "Polls", text: "📊 A new poll is live now!" },
    { type: "Challenges", text: "🏆 You were challenged in a dev quiz" },
    { type: "Likes", text: "👍 Someone liked your post" },
    { type: "Comments", text: "🔔 New comment on your post" },
    { type: "System", text: "📣 Maintenance scheduled tonight" },
  ];

  const filters = [
    "All",
    "Mentions",
    "Likes",
    "Comments",
    "Follows",
    "Jobs",
    "Polls",
    "Challenges",
    "System",
  ];

  const filteredNotifications =
    selectedType === "All"
      ? sampleNotifications
      : sampleNotifications.filter((note) => note.type === selectedType);

  return (
    <div className="space-y-3 relative">
      {/* Filter Buttons */}
      <div className="sticky top-0 z-30 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border-amber-700 border p-3 rounded-lg shadow-sm">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedType(item)}
              className={`inline-block text-sm font-medium px-4 py-1 mx-1 rounded-full transition duration-200 shadow-sm hover:scale-105 ${
                selectedType === item
                  ? "bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:to-amber-700"
                  : "bg-slate-800 hover:bg-slate-700 text-amber-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 rounded-md shadow-md border border-amber-700 divide-y divide-amber-700 bg-fixed">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((note, idx) => (
            <div key={idx} className="p-3 text-white text-sm">
              {note.text}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-amber-400 italic">
            No notifications under "{selectedType}"
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">No more notifications</p>
    </div>
  );
};

export default Notifications;
