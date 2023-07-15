import { configureStore } from '@reduxjs/toolkit'
import inputsReducer from './redux/inputsSlice.jsx'

const rootReducer = {
  inputs: inputsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;