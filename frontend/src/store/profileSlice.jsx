import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  isOwnProfile: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isOwnProfile = false;
    },
    removeProfile: (state) => {
      state.profile = null;
      state.isOwnProfile = true;
    },
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;
