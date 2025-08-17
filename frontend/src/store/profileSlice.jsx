import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  coding: [],
  isOwnProfile: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload.profile;
      state.coding = action.payload.coding;
      state.isOwnProfile = false;
    },
    removeProfile: (state) => {
      state.profile = null;
      state.coding = [];
      state.isOwnProfile = true;
    },
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;
