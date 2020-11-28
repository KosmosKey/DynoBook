import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
});

export const userInformation = (state) => state.user.user;

export default authReducer.reducer;
