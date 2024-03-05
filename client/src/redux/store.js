import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categorySlice.js';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
