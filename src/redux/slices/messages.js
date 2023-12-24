import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (params) => {
  const { data } = await axios.post(`/messages`, params);
  return data;
}); 

const initialState = {
  messages: {
    items: [],
    status: 'loading'
  },
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.messages.items = [];
      state.messages.status = 'loading';
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.messages.items = action.payload;
      state.messages.status = 'loaded';
    },
    [fetchMessages.rejected]: (state) => {
      state.messages.items = [];
      state.messages.status = 'error'
    },
  },
});

export const messagesReducer = messageSlice.reducer;