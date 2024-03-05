import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: {},
  },
  reducers: {
    loadCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { loadCategories } = categorySlice.actions;

export default categorySlice.reducer;
