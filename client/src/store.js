import { configureStore } from "@reduxjs/toolkit";
import inputsReducer from "./redux/inputsSlice.jsx";
import list from "./redux/listIconsSlice.jsx";
import moveSlice from "./redux/move.jsx";
import shopTitle from "./redux/shopTitle.jsx";
import openCloseDialog from "./redux/openCloseDialog.jsx";
import onlineUsers from "./redux/onlineUsers.jsx";
// import askAgain from "./redux/giveOppositeSegments/dialogRemove.jsx";
// import isAdmin from "./redux/isAdmin.jsx";

//segments of get the opposite thing
import eyeReducer from "./redux/giveOppositeSegments/eyeSlice.jsx";
import shopDialogReducer from "./redux/giveOppositeSegments/shopDialog.jsx";
import dialogRemove from "./redux/giveOppositeSegments/dialogRemove.jsx";

//segments of get the index across many comps
import indexContentSlice from "./redux/getIndexSegments/indexContentSlice.jsx";
import indexDialogSlice from "./redux/getIndexSegments/indexDialogShop.jsx";

const rootReducer = {
  inputs: inputsReducer,
  eye: eyeReducer,
  dialog: shopDialogReducer,
  list,
  dialogRemove,
  indexContent: indexContentSlice,
  indexDialogShop: indexDialogSlice,
  moveSlice,
  shopTitle,
  openCloseDialog,
  online: onlineUsers,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// import indexReducer from "./redux/indexContentSlice.jsx";
