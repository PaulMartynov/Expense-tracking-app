import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  Reducer,
} from "@reduxjs/toolkit";
import {
  registerUser,
  signInWithEmailAndPassword,
  signOut,
} from "../api/firebase/auth";
import { appAuth } from "../api/firebase/firebase";
import { loadData, saveData } from "../api/localstorage/localstorage";

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
export function onAuthChange(user: UserInfo): AnyAction {
  return {
    type: "auth/change",
    payload: user,
  };
}

export const onAuthChangeThunk = () => {
  return (dispatch: Dispatch): void => {
    appAuth.onAuthStateChanged((data) => {
      if (data) {
        dispatch(onAuthChange({ userId: data.uid, username: data.email }));
      }
    });
  };
};

function getInitialState(): AuthState {
  const data = loadData();
  if (data.length > 1) {
    return {
      userId: data[0],
      username: data[1],
      isAuthenticated: true,
    };
  }
  return {
    userId: null,
    username: null,
    isAuthenticated: false,
  };
}

export const authReducer: Reducer = (
  state = getInitialState(),
  action: AnyAction
) => {
  switch (action.type) {
    case "auth/change":
      saveData([action.payload.userId, action.payload.username]);
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
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
      saveData([action.payload.userId, action.payload.username]);
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
      saveData([action.payload.userId, action.payload.username]);
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
    });

    builder.addCase("auth/change", authReducer);
  },
});

const { reducer } = authSlice;
export default reducer;
