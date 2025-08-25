import axios from "axios";
import { BASE_URL } from "./constants";
import { resetStore } from "./resetStore";
import { disconnectSocket } from "./socket";

export const logout = async (dispatch, navigate) => {
  try {
    await axios.post(`${BASE_URL}/v1/auth/logout`, null, {
      withCredentials: true,
    });
    disconnectSocket();
    resetStore(dispatch);
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err?.response?.data || err.message);
    alert(err?.response?.data?.message || "Failed to logout. Try again.");
  }
};

export const forceLogout = (dispatch) => {
  disconnectSocket();
  resetStore(dispatch);
  window.location.href = "/login";
};
