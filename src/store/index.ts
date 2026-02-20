import { configureStore, combineReducers } from '@reduxjs/toolkit';
import firebaseReducer from './slices/firebaseSlice';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
