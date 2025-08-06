import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todoReducer from "./todoSlice";
import profileReducer from "./profileSlice";
import notificationReducer from "./notificationSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    profile: profileReducer,
    notification: notificationReducer,
  },
});

export default appStore;
