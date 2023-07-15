import { createSlice } from "@reduxjs/toolkit";

const inputsSlice = createSlice({
  name: "inputs",
  initialState: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    date: ""
  },
  reducers: {
    setInputValue: (state, action) => {
      const { inputName, value } = action.payload;
      state[inputName] = value;
    },
  },
});

export const { setInputValue } = inputsSlice.actions;
export default inputsSlice.reducer;
