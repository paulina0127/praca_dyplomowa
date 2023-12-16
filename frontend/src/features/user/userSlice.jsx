import {
  activateAccountThunk,
  loadUserThunk,
  loginThunk,
  resetPasswordConfirmThunk,
  resetPasswordThunk,
  signupThunk,
} from "./userThunk.";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  successLogin: false,
  successSignup: false,
  successActivateAccount: false,
  successResetPassword: false,
  successResetPasswordConfirm: false,
  successLoadUser: false,
  user: {},
};

export const login = createAsyncThunk("user/login", loginThunk);
export const signup = createAsyncThunk("user/signup", signupThunk);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  resetPasswordThunk,
);
export const activateAccount = createAsyncThunk(
  "user/activateAccount",
  activateAccountThunk,
);
export const resetPasswordConfirm = createAsyncThunk(
  "user/resetPasswwordConfirm",
  resetPasswordConfirmThunk,
);
export const loadUser = createAsyncThunk("user/loadUser", loadUserThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userTokens");
      localStorage.removeItem("user");
      state.user = {};
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successLogin = true;
        localStorage.setItem("userTokens", JSON.stringify(payload));
        window.location.reload();
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successLogin = false;
        toast.error(payload);
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successSignup = true;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successSignup = false;
        toast.error(payload);
      })

      // Activate Account
      .addCase(activateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successActivateAccount = true;
      })
      .addCase(activateAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successActivateAccount = false;
        toast.error(payload);
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successResetPassword = true;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successResetPassword = false;
        toast.error(payload);
      })

      // Reset password confirm
      .addCase(resetPasswordConfirm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordConfirm.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successResetPasswordConfirm = true;
      })
      .addCase(resetPasswordConfirm.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successResetPasswordConfirm = false;
        toast.error(payload);
      })

      // Load user account
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successLoadUser = true;
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(loadUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successLoadUser = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
