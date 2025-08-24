import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConnectionTabs from "./ConnectionTabs";
import UserCard from "./UserCard";
import axios from "axios";
import { setNetwork } from "../../store/networkSlice";
import Loader from "../../components/common/Loader";
import { BASE_URL } from "../../utils/constants";

const Network = () => {
  const [selectedTab, setSelectedTab] = useState("Suggestions");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const users = useSelector((store) => store.network.network);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v1/network/get-users`, {
        withCredentials: true,
      });
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
    await axios.post(
      `${BASE_URL}/v1/network/send-request`,
      { receiverId },
      { withCredentials: true }
    );
  };

  const acceptConnectionRequest = async (senderId) => {
    await axios.post(
      `${BASE_URL}/v1/network/accept-request`,
      { senderId },
      { withCredentials: true }
    );
  };

  const rejectConnectionRequest = async (senderId) => {
    await axios.delete(`${BASE_URL}/v1/network/reject-request`, {
      data: { senderId },
      withCredentials: true,
    });
  };

  const withdrawConnectionRequest = async (receiverId) => {
    await axios.delete(`${BASE_URL}/v1/network/withdraw-request`, {
      data: { receiverId },
      withCredentials: true,
    });
  };

  const disconnectConnectionRequest = async (receiverId) => {
    await axios.delete(`${BASE_URL}/v1/network/disconnect`, {
      data: { receiverId },
      withCredentials: true,
    });
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
