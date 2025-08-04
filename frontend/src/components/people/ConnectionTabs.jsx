import React from "react";

const tabs = ["Suggestions", "Connections", "Requests", "Invites"];

const ConnectionTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="sticky top-16 z-30 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 border border-amber-700 p-3 rounded-lg shadow-sm">
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`inline-block text-sm font-medium px-4 py-1 mx-1 rounded-full transition duration-200 shadow-sm hover:scale-105
              ${
                selectedTab === tab
                  ? "bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:to-amber-700"
                  : "bg-slate-800 text-amber-300 hover:bg-slate-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConnectionTabs;
