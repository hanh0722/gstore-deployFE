import { createSlice, configureStore } from "@reduxjs/toolkit";
import changePostSlice from "./change-post";
import userSlice from "./change-user";
import postsSlice from "./get-posts";
import buttonSlice from "./button";
import {API_ADMIN_INFORMATION} from '../api/api'
const initialStateLayout = {
  isClicked: false,
  isDownloaded: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: initialStateLayout,
  reducers: {
    toggleLayout(state) {
      state.isClicked = !state.isClicked;
    },
    toggleDownload(state) {
      state.isDownloaded = !state.isDownloaded;
    },
  },
});

const initialStateSignIn = {
  isSignedIn: false,
  information: {},
  id: null
};
const signInSlice = createSlice({
  name: "signin",
  initialState: initialStateSignIn,
  reducers: {
    SignIn(state, action) {
      state.isSignedIn = true;
      state.id = action.payload
    },
    SignOut(state) {
      state.isSignedIn = false;
    },
    Information(state, action){
      state.information = action.payload
    },
  },
});

export const adminInformation = () =>{
  return (dispatch) =>{
    const id = localStorage.getItem('isSignedIn');
    const getId = JSON.parse(id);
    if(!id){
      console.log('no id!')
      return;
    }
    fetch(API_ADMIN_INFORMATION(getId)).then(response => response.json())
    .then(data =>{
      dispatch(signInActions.Information(data));
    }).catch(err => console.log(err));
  }
}
export const layoutActions = layoutSlice.actions;
export const signInActions = signInSlice.actions;
const store = configureStore({
  reducer: {
    layout: layoutSlice.reducer,
    signin: signInSlice.reducer,
    post: changePostSlice.reducer,
    user: userSlice.reducer,
    getPosts: postsSlice.reducer,
    btn: buttonSlice.reducer
  },
});

export default store;
