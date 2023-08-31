import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shopTitle",
  initialState: ["units", "pets", "spells", "keys", "chests"],
  reducers: {
    shopReducer: (state, action) => {
      return action.payload;
    },
  },
});

export const { shopReducer } = shopSlice.actions;
export default shopSlice.reducer;
