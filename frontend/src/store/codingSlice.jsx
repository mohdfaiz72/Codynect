import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coding: [],
};

const codingSlice = createSlice({
  name: "coding",
  initialState,
  reducers: {
    setCoding: (state, action) => {
      state.coding = action.payload;
    },
    addCoding: (state, action) => {
      state.coding.push(action.payload);
    },
    updateCoding: (state, action) => {
      state.coding = state.coding.map((profile) =>
        profile._id === action.payload._id ? action.payload : profile
      );
    },
    deleteCoding: (state, action) => {
      state.coding = state.coding.filter(
        (profile) => profile._id !== action.payload
      );
    },
    clearCoding: (state) => {
      state.coding = [];
    },
  },
});

export const { setCoding, addCoding, deleteCoding, updateCoding, clearCoding } =
  codingSlice.actions;
export default codingSlice.reducer;
