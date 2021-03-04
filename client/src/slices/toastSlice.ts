import { createSlice } from "@reduxjs/toolkit";

interface IInitState {
  msg: string;
  type: "success" | "error" | "default";
}

const initialState: IInitState = {
  msg: "",
  type: "default"
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastSuccess: (state, { payload }: { payload: string }) => {
      state.msg = payload;
      state.type = "success";
    },
    toastError: (state, { payload }: { payload: string }) => {
      state.msg = payload;
      state.type = "error";
    },
    clearToast: (state) => {
      state.msg = "";
      state.type = "default";
    }
  }
});

export const { toastSuccess, toastError, clearToast } = toastSlice.actions;
