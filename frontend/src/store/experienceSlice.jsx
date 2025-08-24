import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experience: [],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    addExperience: (state, action) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action) => {
      state.experience = state.experience.map((exp) =>
        exp._id === action.payload._id ? action.payload : exp
      );
    },
    deleteExperience: (state, action) => {
      state.experience = state.experience.filter(
        (exp) => exp._id !== action.payload
      );
    },
    clearExperiences: (state) => {
      state.experience = [];
    },
  },
});

export const {
  setExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  clearExperience,
} = experienceSlice.actions;

export default experienceSlice.reducer;
