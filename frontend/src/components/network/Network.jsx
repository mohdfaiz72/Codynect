import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConnectionTabs from "./ConnectionTabs";
import UserCard from "./UserCard";
import api from "../../utils/api";
import { setNetwork } from "../../store/networkSlice";
import Loader from "../../components/common/Loader";

const Network = () => {
  const [selectedTab, setSelectedTab] = useState("Suggestions");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const users = useSelector((store) => store.network.network);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/v1/network/get-users");
      dispatch(setNetwork(res.data));
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = useMemo(() => {
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
  }, [users, selectedTab]);

  const connectionActions = {
    connect: (id) => api.post("/v1/network/send-request", { receiverId: id }),
    accept: (id) => api.post("/v1/network/accept-request", { senderId: id }),
    reject: (id) =>
      api.delete("/v1/network/reject-request", { data: { senderId: id } }),
    withdraw: (id) =>
      api.delete("/v1/network/withdraw-request", { data: { receiverId: id } }),
    disconnect: (id) =>
      api.delete("/v1/network/disconnect", { data: { receiverId: id } }),
  };

  const handleConnect = async (userId, action = "connect") => {
    setPendingUsers((prev) => [...prev, userId]);
    const delay = new Promise((resolve) => setTimeout(resolve, 600));

    try {
      await Promise.all([connectionActions[action](userId), delay]);
      await fetchUsers();
    } catch (err) {
      console.error("Connection action failed:", err);
    } finally {
      setPendingUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full p-4">
      <ConnectionTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filterUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onConnect={handleConnect}
            isPending={pendingUsers.includes(user._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Network;
