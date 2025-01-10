import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    show: true,
    small: false,
  },
  reducers: {
    showBig: (state) => {
      state.small = false;
    },
    showSmall: (state) => {
      state.small = true;
    },
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});

export const { hide, showBig, show, showSmall } = sidebarSlice.actions;

export default sidebarSlice.reducer;
