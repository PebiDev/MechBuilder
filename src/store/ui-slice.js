import { createSlice } from "@reduxjs/toolkit";

const initialUiState = { mechVisible: false, armorVisible: true };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggleDemoVisible(state) {
      state.mechVisible = !state.mechVisible;
    },
    toggleArmorVisible(state) {
      state.armorVisible = !state.armorVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
