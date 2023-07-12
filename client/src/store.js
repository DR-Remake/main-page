import { configureStore } from '@reduxjs/toolkit'
import inputsSlice from './redux/inputsSlice.jsx'

const rootReducer = {
  inputs: inputsSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;