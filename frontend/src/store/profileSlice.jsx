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
    clearProfile: (state) => {
      state.profile = null;
      state.isOwnProfile = true;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
