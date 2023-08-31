import { createSlice } from "@reduxjs/toolkit";

const openCloseDialog = createSlice({
  name: "openClose",
  initialState: "close",
  reducers: {
    setOpenClose: (state, action) => {
      const { whatToDo } = action.payload;
      return whatToDo;
    },
  },
});

export const { setOpenClose } = openCloseDialog.actions;
export default openCloseDialog.reducer;
