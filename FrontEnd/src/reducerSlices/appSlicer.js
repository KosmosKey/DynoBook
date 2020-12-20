import { createSlice } from "@reduxjs/toolkit";

export const appReducer = createSlice({
  name: "app",
  initialState: {
    navBar: false,
  },
  reducers: {
    setNavBar: (state, action) => {
      state.navBar = action.payload;
    },
    closeNavBar: (state, action) => {
      state.navBar = action.payload;
    },
  },
});

export const { setNavBar, closeNavBar } = appReducer.actions;

export const navBarBolean = (state) => state.app.navBar;

export default appReducer.reducer;
