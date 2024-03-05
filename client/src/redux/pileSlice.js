import { createSlice } from '@reduxjs/toolkit';

export const pileSlice = createSlice({
  name: 'piles',
  initialState: {
    piles: [],
  },
  reducers: {
    loadPiles: (state, action) => {
      state.piles = action.payload;
    },
  },
});

export const { loadPiles } = pileSlice.actions;

export default pileSlice.reducer;
