import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userLogged: {},
    logged: false,
  },
  reducers: {
    login: (state, action) => {
      state.userLogged = {
        ...action.payload,
      };
      state.logged = true;
    },
    logout: (state) => {
      state.userLogged = {};

      state.logged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
