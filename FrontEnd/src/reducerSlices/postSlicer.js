import { createSlice } from "@reduxjs/toolkit";

export const postReducer = createSlice({
  name: "post",
  initialState: {
    commentId: null,
    userId: null,
  },
  reducers: {
    setCommentId: (state, action) => {
      state.commentId = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserNull: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setCommentId, setUserId, setUserNull } = postReducer.actions;

export const commentId = (state) => state.post.commentId;
export const userId = (state) => state.post.userId;

export default postReducer.reducer;
