import {
  activateAccountThunk,
  changeEmailThunk,
  changePasswordThunk,
  deleteAccountThunk,
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
  successSignup: false,
  successActivateAccount: false,
  successResetPassword: false,
  successResetPasswordConfirm: false,
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
export const changeEmail = createAsyncThunk(
  "user/changeEmail",
  changeEmailThunk,
);
export const changePassword = createAsyncThunk(
  "user/changePassword",
  changePasswordThunk,
);
export const deleteAccount = createAsyncThunk(
  "user/rdeleteAccount",
  deleteAccountThunk,
);

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
        localStorage.setItem("userTokens", JSON.stringify(payload));
        window.location.reload();
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
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
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(loadUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

      // Change e-mail
      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Pomyślnie zmieniono e-mail");
      })
      .addCase(changeEmail.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

      // Change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Pomyślnie zmieniono hasło");
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

      // Delete account
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
