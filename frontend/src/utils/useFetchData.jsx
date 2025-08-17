import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import { addUser, removeUser } from "../store/userSlice";
import { setConversations } from "../store/conversationSlice";
import { setCoding, clearCoding } from "../store/codingSlice";
import { useDispatch } from "react-redux";

const useFetchData = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        const [userRes, conversationsRes, codingRes] = await Promise.all([
          axios.get(`${BASE_URL}/user/get-details`, { withCredentials: true }),
          axios.get(`${BASE_URL}/message/conversations`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/coding/get-profile`, {
            withCredentials: true,
          }),
        ]);
        {
          console.log(userRes, codingRes);
        }
        dispatch(addUser(userRes.data));
        dispatch(setCoding(codingRes.data));
        dispatch(setConversations(conversationsRes.data));
      } catch (err) {
        dispatch(removeUser());
        dispatch(clearCoding());
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

export const fetchUserData = async () => {
  try {
    const [userRes, conversationsRes, codingRes] = await Promise.all([
      axios.get(`${BASE_URL}/user/get-details`, { withCredentials: true }),
      axios.get(`${BASE_URL}/message/conversations`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/coding/get-profile`, {
        withCredentials: true,
      }),
    ]);

    {
      console.log(userRes, codingRes);
    }
    dispatch(addUser(userRes.data));
    dispatch(setCoding(codingRes.data));
    dispatch(setConversations(conversationsRes.data));
  } catch (err) {
    console.error("Failed to fetch extra data:", err);
  }
};
