import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todoReducer from "./todoSlice";
import factReducer from "./factSlice";
import newsReducer from "./newsSlice";
import postReducer from "./postSlice";
import skillsReducer from "./skillsSlice";
import codingReducer from "./codingSlice";
import eventsReducer from "./eventsSlice";
import profileReducer from "./profileSlice";
import networkReducer from "./networkSlice";
import projectReducer from "./projectSlice";
import languageReducer from "./languageSlice";
import educationReducer from "./educationSlice";
import experienceReducer from "./experienceSlice";
import conversationReducer from "./conversationSlice";
import notificationReducer from "./notificationSlice";
import certificationReducer from "./certificationSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    fact: factReducer,
    news: newsReducer,
    post: postReducer,
    skills: skillsReducer,
    coding: codingReducer,
    events: eventsReducer,
    profile: profileReducer,
    network: networkReducer,
    project: projectReducer,
    language: languageReducer,
    education: educationReducer,
    experience: experienceReducer,
    conversation: conversationReducer,
    notification: notificationReducer,
    certification: certificationReducer,
  },
});

export default appStore;
