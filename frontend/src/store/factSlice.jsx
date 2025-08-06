import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fact: null,
};

const factSlice = createSlice({
  name: "fact",
  initialState,
  reducers: {
    setFact: (state, action) => {
      state.fact = action.payload;
    },
  },
});

export const { setFact } = factSlice.actions;
export default factSlice.reducer;
