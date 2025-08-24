import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload;
    },
    addProject: (state, action) => {
      state.project.push(action.payload);
    },
    updateProject: (state, action) => {
      state.project = state.projects.map((project) =>
        project._id === action.payload._id ? action.payload : project
      );
    },
    deleteProject: (state, action) => {
      state.project = state.project.filter(
        (proj) => proj._id !== action.payload
      );
    },
    clearProject: (state) => {
      state.project = [];
    },
  },
});

export const {
  setProject,
  addProject,
  updateProject,
  deleteProject,
  clearProject,
} = projectSlice.actions;

export default projectSlice.reducer;
