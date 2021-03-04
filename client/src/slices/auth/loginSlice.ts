import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// toast
import { toastError, toastSuccess } from "../toastSlice";
// profile
import { resetProfileInfo } from "../profile/profileSlice";

const API_ENDPOINT_USER =
  "https://social-network-mkt.herokuapp.com/api/a1/users";
// axios default
axios.defaults.headers.post["Content-Type"] = "application/json";
// types
interface IUserInfo {
  name: string;
  email: string;
  _id: string;
  token: string;
}
interface IInitState {
  userInfo: IUserInfo;
  error: any;
  loading: boolean;
}
// initState
const initState: IInitState = {
  userInfo: {
    name: "",
    email: "",
    _id: "",
    token: ""
  },
  error: "",
  loading: false
};

// Async
// Login
export const loginUser = createAsyncThunk(
  "login/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT_USER}/login`, {
        email,
        password
      });
      // toast
      dispatch(toastSuccess("Erfolgreich eingeloggt"));
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Logout
export const logoutUser = createAsyncThunk(
  "login/logout",
  async (_, { dispatch }) => {
    dispatch(toastSuccess("Erfolgreich ausgeloggt, Bis bald :D"));
    dispatch(resetProfileInfo());
    localStorage.removeItem("userInfo");
    return initState;
  }
);

// CreateSlice
export const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.userInfo = payload;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ======================LOGOUT======================

    builder.addCase(logoutUser.fulfilled, (state) => {
      return initState;
    });
  }
});
