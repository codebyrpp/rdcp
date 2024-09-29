import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/models/user";
import { REHYDRATE } from "redux-persist";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn?: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },
    revokeAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
    refreshAuth: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
        if(state.user && state.accessToken)
            state.isLoggedIn = true;
    });
  },
});

export const { setAuth, revokeAuth, refreshAuth } = authSlice.actions;
export default authSlice.reducer;
