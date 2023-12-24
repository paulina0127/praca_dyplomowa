import {
  createApplicationThunk,
  deleteApplicationThunk,
  getApplicationThunk,
  listApplicationsThunk,
  updateApplicationThunk,
} from "./applicationThunk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  applications: [],
  count: 0,
  application: {},
};

export const getApplication = createAsyncThunk(
  "application/get",
  getApplicationThunk,
);
export const createApplication = createAsyncThunk(
  "application/create",
  createApplicationThunk,
);
export const updateApplication = createAsyncThunk(
  "application/update",
  updateApplicationThunk,
);
export const deleteApplication = createAsyncThunk(
  "application/delete",
  deleteApplicationThunk,
);
export const listApplications = createAsyncThunk(
  "application/list",
  listApplicationsThunk,
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearApplicationState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get
      .addCase(getApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplication.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.application = payload;
      })
      .addCase(getApplication.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas pobierania danych aplikacji");
      })

      // Create
      .addCase(createApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApplication.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.application = payload;
        toast.success("Pomyślnie złożono aplikację o adopcję");
      })
      .addCase(createApplication.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          payload.detail
            ? payload.detail.toString()
            : "Wystąpił błąd przy składaniu aplikacji o adopcję",
        );
      })

      // Update
      .addCase(updateApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApplication.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.application = payload;
        toast.success("Pomyślnie zapisano zmiany");
      })
      .addCase(updateApplication.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas aktualizowania aplikacji");
      })

      // Delete
      .addCase(deleteApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApplication.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.application = {};
        window.location.reload();
      })
      .addCase(deleteApplication.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas usuwania profilu aplikacji");
      })

      // List
      .addCase(listApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listApplications.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.applications = payload.results;
        state.count = payload.count;
      })
      .addCase(listApplications.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas pobierania listy aplikacji");
      });
  },
});

export const { clearApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
