import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './userDataSlice.js';

export const store = configureStore({
  reducer: {
    userdataslice: categoriesReducer,
  },
});
