import { createSlice } from "@reduxjs/toolkit";
import {GET_ALL_POST_URL} from '../api/api'
const initialState = {
  status: "pending",
  posts: [],
  error: null,
};

const postsSlice = createSlice({
  name: "get-posts",
  initialState: initialState,
  reducers: {
    getAllPostsHandler(state, action) {
        state.posts = action.payload;
        state.status = "completed";
    },
    errorHandler(state, action) {
      state.error = action.payload;
    },
    pendingHandler(state) {
      state.status = "pending";
    },
    finishedHandler(state) {
      state.status = "completed";
    },
  },
});

export const fetchingPostsHandler = () => {
  return (dispatch) => {
    dispatch(postsActions.pendingHandler());
    fetch(GET_ALL_POST_URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch(postsActions.getAllPostsHandler(data));
      })
      .catch((err) => dispatch(postsActions.errorHandler(err)));
    dispatch(postsActions.finishedHandler());
  };
};

export const postsActions = postsSlice.actions;
export default postsSlice;
