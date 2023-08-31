// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import getCookieValue from "../comps/HelperFunctions/getCookieValue";

// getCookieValue();

// export const fetchUser = createAsyncThunk("user/fetchUser", async (route) => {
//   const token = getCookieValue("t");
//   try {
//     const res = await axios.get(route, {
//       headers: {
//         Authorization: `Bearer ${token[0][1]}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// });

// const isAdmin = createSlice({
//   name: "isAdmin",
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//     Role: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//         state.Role = action.payload.Role;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default isAdmin.reducer;
