import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// toast
import { toastError } from "../toastSlice";
import { loginUser } from "./loginSlice";

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
  error: any | string;
  loading: boolean;
}

// Async
// Login
export const registerUser = createAsyncThunk(
  "register/register",
  async (
    {
      email,
      password,
      name
    }: { name: string; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT_USER}/register`, {
        email,
        password,
        name
      });
      // toast
      // dispatch(toastSuccess("Erfolgreich angemeldet"));
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(loginUser({ email, password }));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

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

// CreateSlice
export const registerSlice = createSlice({
  name: "register",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.userInfo = payload;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  }
});
