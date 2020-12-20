import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducerSlices/appSlicer";
import authReducer from "./reducerSlices/authSlicer";
import postReducer from "./reducerSlices/postSlicer";

export default configureStore({
  reducer: {
    user: authReducer,
    post: postReducer,
    app: appReducer,
  },
});
