import { createSlice } from "@reduxjs/toolkit";

const inputsSlice = createSlice({
  name: "inputs",
  initialState: {
    input1: "",
    input2: "",
    input3: "",
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
