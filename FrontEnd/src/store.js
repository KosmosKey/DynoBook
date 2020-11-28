import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducerSlices/authSlicer";

export default configureStore({
  reducer: {
    user: authReducer,
  },
});
