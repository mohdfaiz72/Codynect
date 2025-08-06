import { useState, useEffect } from "react";
import ConnectionTabs from "./ConnectionTabs";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const Network = () => {
  const [selectedTab, setSelectedTab] = useState("Suggestions");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/network/get-users`, {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };

    fetchUsers();
  }, []);

  const filterUsers = () => {
    return users.filter((u) => {
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

  return (
    <div className="w-full p-4">
      <ConnectionTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filterUsers().map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Network;
