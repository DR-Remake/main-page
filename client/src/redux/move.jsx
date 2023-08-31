import { createSlice } from "@reduxjs/toolkit";

const moveSlice = createSlice({
  name: "move",
  initialState: 0,
  reducers: {
    setMove: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMove } = moveSlice.actions;
export default moveSlice.reducer;