import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  sidebarCollapsed: false,
  showLoginForm: false,
  showRegisterationForm: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSideBarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleShowLoginForm(state) {
      state.showLoginForm = !state.showLoginForm;
    },
    toggleShowRegisterationForm(state) {
      state.showRegisterationForm = !state.showRegisterationForm;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const {
  toggleSideBarCollapsed,
  setMode,
  toggleShowLoginForm,
  toggleShowRegisterationForm,
} = layoutSlice.actions;
export default layoutSlice.reducer;
