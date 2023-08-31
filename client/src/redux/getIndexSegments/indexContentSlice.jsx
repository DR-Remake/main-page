import giveOpposite from "../getIndex";

const indexContent = giveOpposite("indexContent", "toggleIndexContent");

export const { toggleIndexContent } = indexContent.actions;
export default indexContent.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const indexContentSlice = createSlice({
//   name: "index",
//   initialState: 1,
//   reducers: {
//     changeSelected: (state, action) => {
//       const { index } = action.payload;
//       return index;
//     },
//   },
// });

// export const { changeSelected } = indexContentSlice.actions;
// export default indexContentSlice.reducer;
