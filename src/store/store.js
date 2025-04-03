import { configureStore } from "@reduxjs/toolkit";
import mechSlice from "./mech-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, mech: mechSlice.reducer },
});

export default store;
