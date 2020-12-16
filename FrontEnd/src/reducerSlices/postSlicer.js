import { createSlice } from "@reduxjs/toolkit";

export const postReducer = createSlice({
  name: "post",
  initialState: {
    commentId: null,
  },
  reducers: {
    setCommentId: (state, action) => {
      state.commentId = action.payload;
    },
  },
});

export const { setCommentId } = postReducer.actions;

export const commentId = (state) => state.post.commentId;

export default postReducer.reducer;