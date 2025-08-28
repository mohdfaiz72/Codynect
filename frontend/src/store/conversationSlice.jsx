import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: [],
  selectedChatId: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversation = action.payload;
    },

    addConversation: (state, action) => {
      const newConv = action.payload;
      if (!state.conversation.some((c) => c.id === newConv.id)) {
        state.conversation.push(newConv);
      }
    },

    removeConversation: (state, action) => {
      const conversationId = action.payload;
      state.conversation = state.conversation.filter(
        (c) => c.id !== conversationId
      );
    },

    updateConversationOnNewMessage: (state, action) => {
      const { otherUserId, content, createdAt } = action.payload;
      const convoIndex = state.conversation.findIndex(
        (c) => c.id === otherUserId
      );

      if (convoIndex !== -1) {
        const updatedConvo = {
          ...state.conversation[convoIndex],
          lastMessage: content,
          lastMessageTime: createdAt,
        };
        state.conversation.splice(convoIndex, 1);
        state.conversation.unshift(updatedConvo);
      }
    },

    clearConversation: (state) => {
      state.conversation = [];
      state.selectedChatId = null;
    },

    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const {
  setConversations,
  addConversation,
  removeConversation,
  updateConversationOnNewMessage,
  setSelectedChatId,
  clearConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
