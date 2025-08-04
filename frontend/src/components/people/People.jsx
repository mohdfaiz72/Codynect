import { useState } from "react";
import Users from "../../utils/network";
import ConnectionTabs from "./ConnectionTabs";
import UserCard from "./UserCard";

const People = () => {
  const [selectedTab, setSelectedTab] = useState("Suggestions");

  const getStatus = (u) => {
    if (u.isConnected) return "connected";
    if (u.requested && !u.invite) return "sent";
    if (u.invite && !u.requested) return "received";
    return "new";
  };

  const filterUsers = () => {
    return Users.map((u) => ({ ...u, status: getStatus(u) })).filter((u) => {
      switch (selectedTab) {
        case "Connections":
          return u.status === "connected";
        case "Requests":
          return u.status === "sent";
        case "Invites":
          return u.status === "received";
        case "Suggestions":
        default:
          return u.status === "new";
      }
    });
  };

  const handleConnect = (user, action = "connect") => {
    console.log(`${action.toUpperCase()} -`, user.name);
    // Optionally update Users array or local state here
  };

  return (
    <div className="w-full p-4">
      <ConnectionTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filterUsers().map((user) => (
          <UserCard key={user.id} user={user} onConnect={handleConnect} />
        ))}
      </div>
    </div>
  );
};

export default People;
