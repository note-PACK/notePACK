import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
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

export const { loadCategories } = userDataSlice.actions;

export default userDataSlice.reducer;
