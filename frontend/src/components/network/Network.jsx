import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConnectionTabs from "./ConnectionTabs";
import UserCard from "./UserCard";
import { setNetwork } from "../../store/networkSlice";
import Loader from "../../components/common/Loader";
import api from "../../utils/api";

const Network = () => {
  const [selectedTab, setSelectedTab] = useState("Suggestions");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const users = useSelector((store) => store.network.network);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/v1/network/");
      {
        console.log(res.data);
      }
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

  const sendConnectionRequest = async (receiverId) => {
    await api.post("/v1/network/send", { receiverId });
  };

  const acceptConnectionRequest = async (senderId) => {
    await api.post("/v1/network/accept", { senderId });
  };

  const rejectConnectionRequest = async (senderId) => {
    await api.delete(`/v1/network/reject?senderId=${senderId}`);
  };

  const withdrawConnectionRequest = async (receiverId) => {
    await api.delete(`/v1/network/withdraw?receiverId=${receiverId}`);
  };

  const disconnectConnectionRequest = async (receiverId) => {
    await api.delete(`/v1/network/disconnect?receiverId=${receiverId}`);
  };

  const handleConnect = async (userId, status = "connect") => {
    setPendingUsers((prev) => [...prev, userId]);

    const delay = new Promise((resolve) => setTimeout(resolve, 600));

    try {
      switch (status) {
        case "connect":
          await Promise.all([sendConnectionRequest(userId), delay]);
          break;
        case "accept":
          await Promise.all([acceptConnectionRequest(userId), delay]);
          break;
        case "reject":
          await Promise.all([rejectConnectionRequest(userId), delay]);
          break;
        case "withdraw":
          await Promise.all([withdrawConnectionRequest(userId), delay]);
          break;
        case "disconnect":
          await Promise.all([disconnectConnectionRequest(userId), delay]);
          break;
        default:
          break;
      }

      await fetchUsers();
    } catch (err) {
      console.error("Connection action failed:", err);
    } finally {
      setPendingUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  if (loading) {
    return <Loader />;
  }

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
