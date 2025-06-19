import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bandsReducer from './slices/bandsSlice';
import rehearsalsReducer from './slices/rehearsalsSlice';
import setlistsReducer from './slices/setlistsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandsReducer,
    rehearsals: rehearsalsReducer,
    setlists: setlistsReducer,
  },
});