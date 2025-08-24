import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certification: [],
};

const certificationSlice = createSlice({
  name: "certification",
  initialState,
  reducers: {
    setCertification: (state, action) => {
      state.certification = action.payload;
    },
    addCertification: (state, action) => {
      state.certification.push(action.payload);
    },
    updateCertification: (state, action) => {
      state.certification = state.certification.map((cert) =>
        cert._id === action.payload._id ? action.payload : cert
      );
    },
    deleteCertification: (state, action) => {
      state.certification = state.certification.filter(
        (cert) => cert._id !== action.payload
      );
    },
    clearCertification: (state) => {
      state.certification = [];
    },
  },
});

export const {
  setCertification,
  addCertification,
  updateCertification,
  deleteCertification,
  clearCertification,
} = certificationSlice.actions;

export default certificationSlice.reducer;
