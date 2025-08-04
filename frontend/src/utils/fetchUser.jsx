import axios from "axios";
import { BASE_URL } from "./constants";
import { addUser, removeUser, setLoading, setError } from "../store/userSlice";

const fetchUser = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const res = await axios.get(`${BASE_URL}/user/get-details`, {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(removeUser());
    dispatch(setError("Failed to fetch user"));
    dispatch(setLoading(false));
  }
};

export default fetchUser;
