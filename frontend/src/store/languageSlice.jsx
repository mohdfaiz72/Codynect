import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: [],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    addLanguage: (state, action) => {
      state.language.push(action.payload);
    },
    updateLanguage: (state, action) => {
      state.language = state.language.map((lang) =>
        lang._id === action.payload._id ? action.payload : lang
      );
    },
    deleteLanguage: (state, action) => {
      state.language = state.language.filter(
        (lang) => lang._id !== action.payload
      );
    },
    clearLanguage: (state) => {
      state.language = [];
    },
  },
});

export const {
  setLanguage,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  clearLanguage,
} = languageSlice.actions;

export default languageSlice.reducer;
