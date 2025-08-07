import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  network: [],
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
  },
});

export const { setNetwork } = networkSlice.actions;
export default networkSlice.reducer;
