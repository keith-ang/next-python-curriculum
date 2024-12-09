import { createSlice } from '@reduxjs/toolkit';

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

// Export actions
export const { setDays } = daysSlice.actions;
export const { setFilename, clearFilename } = filenameSlice.actions;

// Export reducers
const rootReducer = {
  days: daysSlice.reducer,
  filename: filenameSlice.reducer,
};

export default rootReducer;