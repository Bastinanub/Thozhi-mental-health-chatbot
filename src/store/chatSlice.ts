import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from '../types/chat';

const initialState: ChatState = {
  messages: [],
  isTyping: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.isTyping = false;
    },
  },
});

export const { addMessage, setTyping, clearChat } = chatSlice.actions;
export default chatSlice.reducer;