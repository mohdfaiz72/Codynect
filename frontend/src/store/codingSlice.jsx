import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coding: [],
  isLoaded: false,
};

const codingSlice = createSlice({
  name: "coding",
  initialState,
  reducers: {
    setCoding: (state, action) => {
      state.coding = action.payload;
      state.isLoaded = true;
    },
    addCoding: (state, action) => {
      state.coding.push(action.payload);
    },
    updateCoding: (state, action) => {
      const index = state.coding.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.coding[index] = action.payload;
      }
    },
    deleteCoding: (state, action) => {
      state.coding = state.coding.filter((t) => t._id !== action.payload);
    },
    clearCoding: (state) => {
      state.coding = [];
      state.isLoaded = false;
    },
  },
});

export const { setCoding, addCoding, deleteCoding, updateCoding, clearCoding } =
  codingSlice.actions;
export default codingSlice.reducer;
