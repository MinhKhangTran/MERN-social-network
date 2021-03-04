import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "../slices/postSlice";
import { profileSlice } from "../slices/profile/profileSlice";
import { loginSlice } from "../slices/auth/loginSlice";
import { registerSlice } from "../slices/auth/registerSlice";
// Toast
import { toastSlice } from "../slices/toastSlice";

interface IUserInit {
  name: string;
  email: string;
  token: string;
  _id: string;
}

const userInit: IUserInit = {
  name: "",
  email: "",
  token: "",
  _id: ""
};

// initState from localStorage
const userInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return userInit;
  }
};

// types
interface IPreloadedState {
  login: {
    userInfo: IUserInit;
  };
}

const preloadedState: IPreloadedState = {
  login: {
    userInfo: userInfoFromLocalStorage()
  }
};

// store
export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    profile: profileSlice.reducer,
    post: postSlice.reducer,
    toast: toastSlice.reducer
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
