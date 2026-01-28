import { configureStore } from '@reduxjs/toolkit';
import firebaseReducer from './slices/firebaseSlice';

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
