// redux/notification/notificationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    showNotifications: false,
  },
  reducers: {
    setShowNotifications: (state, action) => {
      state.showNotifications = action.payload;
    },
  },
});

export const { setShowNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
