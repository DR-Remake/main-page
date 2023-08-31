// import { createSlice } from "@reduxjs/toolkit";

// const cookieSlice = createSlice({
//   name: "cookie",
//   initialState: [],
//   reducers: {
//     getCookieValue: (state, action) => {
//       const theCookie = action.payload;
//       const decodedCookie = decodeURIComponent(document.cookie);
//       const cookieArray = decodedCookie.split(";");

//       let result = cookieArray.map((cookie) => {
//         return cookie
//           .trim()
//           .split("=")
//           .filter((word) => word.includes(theCookie));
//       });

//       state.push(...result.filter((arr) => arr.length > 0));
//     },
//   },
// });

// export const { getCookieValue } = cookieSlice.actions;
// export default cookieSlice.reducer;
