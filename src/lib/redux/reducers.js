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

// Chatbot Visibility slice
const chatbotVisibilitySlice = createSlice({
  name: 'chatbotVisibility',
  initialState: false,
  reducers: {
    toggleChatbotVisibility: (state) => !state,
  }
});

// Chat Messages slice
const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState: [],
  reducers: {
    setChatMessages: (state, action) => action.payload,
    appendChatMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Popup Size slice
const popupSizeSlice = createSlice({
  name: 'popupSize',
  initialState: { width: 320, height: 480 },
  reducers: {
    setPopupSize: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDays } = daysSlice.actions;
export const { setFilename, clearFilename } = filenameSlice.actions;
export const { toggleChatbotVisibility } = chatbotVisibilitySlice.actions;
export const { setChatMessages, appendChatMessage } = chatMessagesSlice.actions;
export const { setPopupSize } = popupSizeSlice.actions;

const rootReducer = combineReducers({
  days: daysSlice.reducer,
  filename: filenameSlice.reducer,
  chatbotVisibility: chatbotVisibilitySlice.reducer,
  chatMessages: chatMessagesSlice.reducer,
  popupSize: popupSizeSlice.reducer,
});

export default rootReducer;