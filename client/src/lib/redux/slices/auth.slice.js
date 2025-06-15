import { createSlice } from "@reduxjs/toolkit";
import { authApiEndpoints } from "../services/auth.api.service";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiEndpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      }
    );
    builder
      .addMatcher(
        authApiEndpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
        }
      )
      .addMatcher(
        authApiEndpoints.getUserProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        }
      );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
