import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: [],
  selectedChat: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setConversation, setSelectedChat } = conversationSlice.actions;
export default conversationSlice.reducer;
