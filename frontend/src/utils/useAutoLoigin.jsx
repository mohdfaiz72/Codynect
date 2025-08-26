import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./constants";
import fetchData from "./fetchData";
import { connectSocket } from "./socket";
import { setAccessToken } from "../store/authSlice";
import { setUser } from "../store/userSlice";

const useAutoLogin = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store.auth);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/v1/auth/renew`, null, {
          withCredentials: true,
        });
        dispatch(setAccessToken(res.data.accessToken));
        dispatch(setUser(res.data.user));
        await fetchData(dispatch);
        connectSocket();
      } catch (err) {
        console.log("Not logged in:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      autoLogin();
    } else {
      setLoading(false);
    }
  }, [dispatch, isAuthenticated]);

  return loading;
};

export default useAutoLogin;
