import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import { addUser, removeUser } from "../store/userSlice";
import { setConversations } from "../store/conversationSlice";
import { useDispatch } from "react-redux";

const useFetchData = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        const [userRes, conversationsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user/get-details`, { withCredentials: true }),
          axios.get(`${BASE_URL}/message/conversations`, {
            withCredentials: true,
          }),
        ]);
        dispatch(addUser(userRes.data));
        dispatch(setConversations(conversationsRes.data));
      } catch (err) {
        dispatch(removeUser());
        console.error("Failed to fetch user or conversations", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return { initialLoading };
};

export default useFetchData;
