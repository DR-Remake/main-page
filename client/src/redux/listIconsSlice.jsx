import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: [
    {
      desc: "Home",
    },
    {
      desc: "News & Notification",
    },
    {
      desc: "Shop",
    },
    {
      desc: "Leaderboards",
    },
    {
      desc: "DRR Team",
    },
    {
      desc: "Settings",
    },
  ],
});

export default listSlice.reducer;
