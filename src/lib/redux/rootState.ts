import rootReducer from './reducers';

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;