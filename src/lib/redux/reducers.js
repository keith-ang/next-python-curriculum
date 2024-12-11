//reducers.js
import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; 

// Days slice
const daysSlice = createSlice({
  name: 'days',
  initialState: [],
  reducers: {
    setDays: (state, action) => action.payload,
  },
});

// Filename slice
const filenameSlice = createSlice({
  name: 'filename',
  initialState: '',
  reducers: {
    setFilename: (state, action) => action.payload,
    clearFilename: () => '',
  },
});

const chatbotVisibilitySlice = createSlice({
  name: 'chatbotVisibility',
  initialState: false,
  reducers: {
    toggleChatbotVisibility: (state) => {
      return !state;
    }
  }
});

export const { toggleChatbotVisibility } = chatbotVisibilitySlice.actions;
export const { setDays } = daysSlice.actions;
export const { setFilename, clearFilename } = filenameSlice.actions;

const rootReducer = combineReducers({
  days: daysSlice.reducer,
  filename: filenameSlice.reducer,
  chatbotVisibility: chatbotVisibilitySlice.reducer,
});

export default rootReducer;