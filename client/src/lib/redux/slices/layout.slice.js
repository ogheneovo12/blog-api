import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  sidebarCollapsed: false,
  showProjectNameForm: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSideBarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleShowProjectNameForm(state) {
      state.showProjectNameForm = !state.showProjectNameForm;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { toggleSideBarCollapsed, setMode, toggleShowProjectNameForm } =
  layoutSlice.actions;
export default layoutSlice.reducer;
