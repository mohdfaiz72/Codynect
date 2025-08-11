import { io } from "socket.io-client";
import { URL } from "./constants";

let socket;
export const connectSocket = () => {
  if (!socket) {
    socket = io(URL, { withCredentials: true, transports: ["websocket"] });
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
