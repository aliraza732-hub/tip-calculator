import { configureStore } from '@reduxjs/toolkit';
import tipReducer from '../redux/tipCalculaotr'

export const store = configureStore({
  reducer: {
    // This is the crucial part!
    // The key here ('tipCalculator') must match the key you use in useSelector.
    tipCalculator: tipReducer,
  },
});

export default store;
