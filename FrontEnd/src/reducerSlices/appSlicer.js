import { createSlice } from "@reduxjs/toolkit";

export const appReducer = createSlice({
  name: "app",
  initialState: {
    navBar: false,
    trends_id: null,
    trends_name: null,
    trendLoader: true,
  },
  reducers: {
    setNavBar: (state, action) => {
      state.navBar = action.payload;
    },
    closeNavBar: (state, action) => {
      state.navBar = action.payload;
    },
    setTrendId: (state, action) => {
      state.trends_id = action.payload.id;
      state.trends_name = action.payload.name;
      state.trendLoader = false;
    },
  },
});

export const { setNavBar, closeNavBar, setTrendId } = appReducer.actions;

export const navBarBolean = (state) => state.app.navBar;

export const trends_name = (state) => state.app.trends_name;
export const trends_id = (state) => state.app.trends_id;
export const trends_loader = (state) => state.app.trendLoader;

export default appReducer.reducer;
