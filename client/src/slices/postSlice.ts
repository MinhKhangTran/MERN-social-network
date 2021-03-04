import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
// toast
import { toastError, toastSuccess } from "./toastSlice";

axios.defaults.headers.post["Content-Type"] = "application/json";
const API_ENDPOINT_POST =
  "https://social-network-mkt.herokuapp.com/api/a1/posts";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2EwOWM4MGQ0MmVmNDVmMGI0NDNmMiIsImlhdCI6MTYxNDgzNjc3MiwiZXhwIjoxNjE1NDQxNTcyfQ.Hmgcvih_Dth4NMbvDwZOo0bck---fhanTDU5EdvrTp4
// types
interface IComment {
  user: string;
  text: string;
  name: string;
  date: string;
  _id: string;
}
interface IPostInfo {
  _id: string;
  text: string;
  user: string;
  name: string;
  likes?: string[];
  comments?: IComment[];
  createdAt: string;
}

interface IInitState {
  postInfo?: IPostInfo[] | null;
  error: any;
  loading: boolean;
  post?: IPostInfo | null;
  success: boolean;
}

// initstate
const initState: IInitState = {
  postInfo: null,
  error: "",
  loading: false,
  post: null,
  success: false
};

// Async
// Get Posts
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      // get userInfo
      const {
        login: { userInfo }
      } = getState() as RootState;
      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      const { data } = await axios.get(`${API_ENDPOINT_POST}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// GetPost by Id
// create Post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (
    { text }: { text: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get userInfo
      const {
        login: { userInfo }
      } = getState() as RootState;
      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${API_ENDPOINT_POST}`,
        { text },
        config
      );
      // toast
      dispatch(toastSuccess("Post erfolgreich erstellt"));

      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Delete Post
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (
    { postId }: { postId: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get userInfo
      const {
        login: { userInfo }
      } = getState() as RootState;
      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.delete(
        `${API_ENDPOINT_POST}/${postId}`,

        config
      );
      // toast
      dispatch(toastSuccess("Post erfolgreich gelöscht"));

      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Like post
export const likePost = createAsyncThunk(
  "post/likePost",
  async (
    { postId }: { postId: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get userInfo
      const {
        login: { userInfo }
      } = getState() as RootState;
      // Bearer Token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        `${API_ENDPOINT_POST}/like/${postId}`,
        {},
        config
      );
      // toast
      dispatch(toastSuccess("❤️"));
      // console.log(data);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// unlike Post
export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async (
    { postId }: { postId: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get userInfo
      const {
        login: { userInfo }
      } = getState() as RootState;
      // Bearer Token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        `${API_ENDPOINT_POST}/unlike/${postId}`,
        {},
        config
      );
      // toast
      dispatch(toastSuccess("🥺"));
      // console.log(data);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// create Comment
export const createComment = createAsyncThunk(
  "post/createComment",
  async (
    { text, postId }: { text: string; postId: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get userInfo
      const {
        login: { userInfo }
      } = getState() as RootState;
      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${API_ENDPOINT_POST}/comment/${postId}`,
        { text },
        config
      );
      // toast
      dispatch(toastSuccess("Kommentar erfolgreich erstellt"));

      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Delete Post
export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (
    { postId, commentId }: { postId: string; commentId: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get userInfo
      const {
        login: { userInfo }
      } = getState() as RootState;
      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.delete(
        `${API_ENDPOINT_POST}/comment/${postId}/${commentId}`,

        config
      );
      // toast
      dispatch(toastSuccess("Kommentar erfolgreich gelöscht"));

      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// CreateSlice
export const postSlice = createSlice({
  name: "post",
  initialState: initState,
  reducers: {
    clearStateAfterPutOrDeleteForReRendering: (state) => {
      state.success = false;
      return state;
    }
  },
  extraReducers:
    // builder
    (builder) => {
      // ==========================GET POSTS==============================
      builder.addCase(getPosts.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = "";
        state.postInfo = payload;
      });
      builder.addCase(getPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      // ==========================CREATE POST==============================
      builder.addCase(createPost.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = "";
        state.postInfo?.push(payload);
        state.success = true;
      });
      builder.addCase(createPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      // ==========================Delete POST==============================
      builder.addCase(deletePost.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.success = true;
      });
      builder.addCase(deletePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      // ==========================LIKE POST==============================
      builder.addCase(likePost.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(likePost.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.error = "";
        state.success = true;
        // state.postInfo = payload;
      });
      builder.addCase(likePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      // ==========================UNLIKE POST==============================
      builder.addCase(unlikePost.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(unlikePost.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.error = "";
        state.success = true;
        // state.postInfo = payload;
      });
      builder.addCase(unlikePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      // ==========================CREATE COMMENT==============================
      builder.addCase(createComment.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createComment.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = "";
        state.success = true;
      });
      builder.addCase(createComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      // ==========================Delete COMMENT==============================
      builder.addCase(deleteComment.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteComment.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.success = true;
      });
      builder.addCase(deleteComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    }
});

export const { clearStateAfterPutOrDeleteForReRendering } = postSlice.actions;
