import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
// toast
import { toastError, toastSuccess } from "../toastSlice";

axios.defaults.headers.post["Content-Type"] = "application/json";
const API_ENDPOINT_PROFILE =
  "https://social-network-mkt.herokuapp.com/api/a1/profiles";

// types
export interface IProfileInfo {
  social: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  skills?: string[];
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  bio: string;
  company: string;
  createdAt: string;
  githubusername: string;
  location: string;
  status:
    | "status"
    | "senior"
    | "junior"
    | "ceo"
    | "cto"
    | "praktikant"
    | "anderes";
  website: string;
  experience?: any[];
  education?: any[];
}
interface IInitState {
  profileInfo?: IProfileInfo | null;
  error: any;
  loading: boolean;
  profiles?: IProfileInfo[] | null;
  singleProfile?: IProfileInfo | null;
}
// initState
const initialState: IInitState = {
  profileInfo: null,
  error: "",
  loading: false,
  profiles: null,
  singleProfile: null
};

// Async
// Get profile of logged user
export const getProfileOfLoggedUser = createAsyncThunk(
  "profile/getProfile",
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
      const { data } = await axios.get(`${API_ENDPOINT_PROFILE}/me`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// reset Profileinfo
export const resetProfileInfo = createAsyncThunk(
  "profile/resetProfileInfo",
  async (_, { dispatch }) => {
    return initialState;
  }
);
// create Profile
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (
    {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      social: { youtube, twitter, facebook, instagram }
    }: {
      company: string;
      website: string;
      location: string;
      status: string;
      skills: any;
      bio: string;
      githubusername: string;
      social: {
        youtube: string;
        twitter: string;
        facebook: string;
        instagram: string;
      };
    },
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
        `${API_ENDPOINT_PROFILE}`,
        {
          company,
          website,
          location,
          status,
          skills,
          bio,
          githubusername,
          social: { youtube, twitter, facebook, instagram }
        },
        config
      );
      // console.log(data);
      // toast
      dispatch(toastSuccess("Profil erfolgreich erstellt"));

      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get profiles
export const getProfiles = createAsyncThunk(
  "profile/getProfiles",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT_PROFILE}`);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Get profiles by ID
export const getProfilesByID = createAsyncThunk(
  "profile/getProfilesById",
  async ({ _id }: { _id: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT_PROFILE}/${_id}`);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// delete profile by ID
export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
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
        `${API_ENDPOINT_PROFILE}/${id}`,
        config
      );
      console.log(data);
      dispatch(toastSuccess("Profil wurde gelöscht :("));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update Edu
export const updateEdu = createAsyncThunk(
  "profile/updateEdu",
  async (
    {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }: {
      school: string;
      degree: string;
      fieldofstudy: string;
      from: string;
      to: string;
      current: boolean;
      description: string;
    },
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
      const { data } = await axios.put(
        `${API_ENDPOINT_PROFILE}/edu`,
        {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        },
        config
      );
      // console.log(data);
      dispatch(toastSuccess("Bildung wurde erstellt"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// delete edu
export const deleteEdu = createAsyncThunk(
  "profile/delete",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
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
        `${API_ENDPOINT_PROFILE}/edu/${id}`,
        config
      );
      console.log(data);
      dispatch(toastSuccess("Bildung wurde gelöscht"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// ==================================================================================
// =======================================EXP========================================
// ==================================================================================

// update Edu
export const updateExp = createAsyncThunk(
  "profile/updateExp",
  async (
    {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }: {
      title: string;
      company: string;
      location: string;
      from: string;
      to: string;
      current: boolean;
      description: string;
    },
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
      const { data } = await axios.put(
        `${API_ENDPOINT_PROFILE}/exp`,
        {
          title,
          company,
          location,
          from,
          to,
          current,
          description
        },
        config
      );
      // console.log(data);
      dispatch(toastSuccess("Exp wurde erstellt"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// delete edu
export const deleteExp = createAsyncThunk(
  "profile/deleteExp",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
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
        `${API_ENDPOINT_PROFILE}/exp/${id}`,
        config
      );
      console.log(data);
      dispatch(toastSuccess("Exp wurde gelöscht"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// CreateSlice
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileOfLoggedUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileOfLoggedUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.profileInfo = payload;
    });
    builder.addCase(getProfileOfLoggedUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ======================Reset ProfileInfo======================

    builder.addCase(resetProfileInfo.fulfilled, (state) => {
      return initialState;
    });
    // ====================== Profilecreation======================
    builder.addCase(createProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.profileInfo = payload;
    });
    builder.addCase(createProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ========================GET PROFILES===========================
    builder.addCase(getProfiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfiles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.profiles = payload;
    });
    builder.addCase(getProfiles.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ========================GET PROFILES BY ID===========================
    builder.addCase(getProfilesByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfilesByID.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.singleProfile = payload;
    });
    builder.addCase(getProfilesByID.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ========================Delete PROFILES BY ID===========================
    builder.addCase(deleteProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProfile.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ====================== update profile======================
    builder.addCase(updateEdu.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEdu.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.profileInfo = payload;
    });
    builder.addCase(updateEdu.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ====================== delete edu======================
    builder.addCase(deleteEdu.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEdu.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.profileInfo = payload;
    });
    builder.addCase(deleteEdu.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ====================== update exp======================
    builder.addCase(updateExp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateExp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.profileInfo = payload;
    });
    builder.addCase(updateExp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ====================== delete exp======================
    builder.addCase(deleteExp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteExp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.profileInfo = payload;
    });
    builder.addCase(deleteExp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  }
});
