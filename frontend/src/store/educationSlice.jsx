import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  education: [],
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action) => {
      state.education = state.education.map((edu) =>
        edu._id === action.payload._id ? action.payload : edu
      );
    },
    deleteEducation: (state, action) => {
      state.education = state.education.filter(
        (edu) => edu._id !== action.payload
      );
    },
    clearEducation: (state) => {
      state.education = [];
    },
  },
});

export const {
  setEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  clearEducation,
} = educationSlice.actions;

export default educationSlice.reducer;
