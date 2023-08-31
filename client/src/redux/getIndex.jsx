import { createSlice } from "@reduxjs/toolkit";

const getIndex = (sliceName, sliceAction) => {
  return createSlice({
    name: sliceName,
    initialState: 1,
    reducers: {
        [sliceAction]: (state, action) => {
          const { index } = action.payload;
          return index;
        },
      },
  });
};

export default getIndex;
