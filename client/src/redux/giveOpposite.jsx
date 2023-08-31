import { createSlice } from "@reduxjs/toolkit";

const giveOpposite = (sliceName, sliceAction) => {
  return createSlice({
    name: sliceName,
    initialState: false,
    reducers: {
      [sliceAction]: (state) => {
        return !state;
      },
    },
  });
};

export default giveOpposite;
