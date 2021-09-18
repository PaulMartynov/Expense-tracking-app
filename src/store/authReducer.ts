import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  signInWithEmailAndPassword,
  signOut,
} from "../api/firebase/auth";

export const loginByEmailAndPassword = createAsyncThunk<
  UserInfo,
  { email: string; password: string }
>(
  "auth/login",

  async ({ email, password }): Promise<UserInfo> => {
    const data = await signInWithEmailAndPassword(email, password);

    return { userId: data.user?.uid, username: data.user?.email };
  }
);

export const registerByEmailAndPassword = createAsyncThunk<
  UserInfo,
  { email: string; password: string }
>(
  "auth/register",

  async ({ email, password }): Promise<UserInfo> => {
    const data = await registerUser(email, password);

    return { userId: data.user?.uid, username: data.user?.email };
  }
);

export const logout = createAsyncThunk<unknown, unknown>(
  "auth/logout",
  async (): Promise<void> => {
    await signOut();
  }
);

const initState: AuthState = {
  userId: null,
  username: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginByEmailAndPassword.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loginByEmailAndPassword.rejected, (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    });
    builder.addCase(loginByEmailAndPassword.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    });

    builder.addCase(registerByEmailAndPassword.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(registerByEmailAndPassword.rejected, (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    });
    builder.addCase(registerByEmailAndPassword.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
