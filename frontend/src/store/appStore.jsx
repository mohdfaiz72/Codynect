import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todoReducer from "./todoSlice";
import factReducer from "./factSlice";
import newsReducer from "./newsSlice";
import eventsReducer from "./eventsSlice";
import profileReducer from "./profileSlice";
import networkReducer from "./networkSlice";
import conversationReducer from "./conversationSlice";
import notificationReducer from "./notificationSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    fact: factReducer,
    news: newsReducer,
    events: eventsReducer,
    profile: profileReducer,
    network: networkReducer,
    conversation: conversationReducer,
    notification: notificationReducer,
  },
});

export default appStore;
