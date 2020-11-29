import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
    authenticated: true,
  },
  reducers: {
    setUserInformation: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    loginSuccess: (state, action) => {
      state.authenticated = true;
    },
    userError: (state, action) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const {
  setUserInformation,
  loginSuccess,
  userError,
} = authReducer.actions;

export const userInformation = (state) => state.user.user;
export const userAuthenticated = (state) => state.user.authenticated;

export default authReducer.reducer;
