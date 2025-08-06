import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { setNews, removeNews } = newsSlice.actions;
export default newsSlice.reducer;
