import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
    authenticated: true,
    loading: true,
    pfp: null,
  },
  reducers: {
    setUserInformation: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.authenticated = action.payload;
      state.loading = true;
    },
    userError: (state, action) => {
      state.user = action.payload;
      state.authenticated = false;
      state.loading = false;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.authenticated = action.payload;
      state.loading = true;
    },
    setProfilePicture: (state, action) => {
      state.pfp = action.payload;
    },
  },
});

export const {
  setUserInformation,
  loginSuccess,
  userError,
  logoutUser,
  setProfilePicture,
} = authReducer.actions;

export const userInformation = (state) => state.user.user;
export const userAuthenticated = (state) => state.user.authenticated;
export const loaderScreen = (state) => state.user.loading;
export const profile_picture = (state) => state.user.pfp;

export default authReducer.reducer;
