import { createSlice } from "@reduxjs/toolkit";

const onlineUsers = createSlice({
  name: "online",
  initialState: 0,
  reducers: {
    setOnlineUsers: (state, action) => {
      const { number } = action.payload;
      return number;
    },
  },
});

export const { setOnlineUsers } = onlineUsers.actions;
export default onlineUsers.reducer;