import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: [],
  selectedChatId: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    // Reducer for the initial fetch of all conversations
    setConversations: (state, action) => {
      state.conversation = action.payload;
    },

    // Reducer to add a single new conversation (if it's not already there)
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

    // Reducer to update a conversation when a new message is received via socket
    updateConversationOnNewMessage: (state, action) => {
      const { otherUserId, content, createdAt } = action.payload;
      const convoIndex = state.conversation.findIndex(
        (c) => c.id === otherUserId
      );

      // Only proceed if the conversation exists
      if (convoIndex !== -1) {
        // Create the updated conversation object
        const updatedConvo = {
          ...state.conversation[convoIndex],
          lastMessage: content,
          lastMessageTime: createdAt,
        };
        // Remove the old conversation from the array
        state.conversation.splice(convoIndex, 1);
        // Add the updated conversation to the beginning of the array
        state.conversation.unshift(updatedConvo);
      }
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
} = conversationSlice.actions;

export default conversationSlice.reducer;
