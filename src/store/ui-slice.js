import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  mechVisible: false,
  armorVisible: true,
  advancedOptions: true,
  armorSliders: true,
};

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
    toggleAdvancedOptions(state) {
      state.advancedOptions = !state.advancedOptions;
    },
    toggleArmorSliders(state) {
      state.armorSliders = !state.armorSliders;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
