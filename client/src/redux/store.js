import { configureStore } from '@reduxjs/toolkit';
import pilesReducer from './pileSlice';

export const store = configureStore({
  reducer: {
    piles: pilesReducer,
  },
});
