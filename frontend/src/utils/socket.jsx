import { io } from "socket.io-client";
import { URL } from "./constants";
import store from "../store/appStore";

let socket;
export const connectSocket = () => {
  if (!socket) {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    socket = io(URL, {
      transports: ["websocket"],
      auth: { token: accessToken },
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
