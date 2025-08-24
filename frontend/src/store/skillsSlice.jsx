import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action) => {
      state.skills = state.skills.map((skill) =>
        skill._id === action.payload._id ? action.payload : skill
      );
    },
    deleteSkill: (state, action) => {
      state.skills = state.skills.filter(
        (skill) => skill._id !== action.payload
      );
    },
    clearSkills: (state) => {
      state.skills = [];
    },
  },
});

export const { setSkills, addSkill, updateSkill, deleteSkill, clearSkills } =
  skillsSlice.actions;

export default skillsSlice.reducer;
