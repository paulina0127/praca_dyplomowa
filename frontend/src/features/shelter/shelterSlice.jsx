import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createShelterThunk,
  deleteShelterThunk,
  getShelterThunk,
  listSheltersThunk,
  updateShelterThunk,
} from "./shelterThunk";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  successGet: false,
  errorGet: "",
  successCreate: false,
  errorCreate: "",
  successUpdate: false,
  errorUpdate: "",
  successDelete: false,
  errorDelete: "",
  successList: false,
  errorList: "",
  shelters: [],
  count: 0,
  shelter: {},
};

export const getShelter = createAsyncThunk("shelter/get", getShelterThunk);
export const createShelter = createAsyncThunk(
  "shelter/create",
  createShelterThunk,
);
export const updateShelter = createAsyncThunk(
  "shelter/update",
  updateShelterThunk,
);
export const deleteShelter = createAsyncThunk(
  "shelter/delete",
  deleteShelterThunk,
);
export const listShelters = createAsyncThunk("shelter/list", listSheltersThunk);

const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {
    clearShelterState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get
      .addCase(getShelter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShelter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successGet = true;
        state.shelter = payload;
      })
      .addCase(getShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successGet = false;
        state.errorGet = payload;
        toast.error(payload);
      })

      // Create
      .addCase(createShelter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShelter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successCreate = true;
        state.shelter = payload;
      })
      .addCase(createShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successCreate = false;
        state.errorCreate = payload;
        toast.error(payload);
      })

      // Update
      .addCase(updateShelter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShelter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUpdate = true;
        state.shelter = payload;
      })
      .addCase(updateShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successUpdate = false;
        state.errorUpdate = payload;
        toast.error(payload);
      })

      // Delete
      .addCase(deleteShelter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShelter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successDelete = true;
      })
      .addCase(deleteShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successDelete = false;
        state.errorDelete = payload;
        toast.error(payload);
      })

      // List
      .addCase(listShelters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listShelters.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successList = true;
        state.shelters = payload.results;
        state.count = payload.count;
      })
      .addCase(listShelters.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successList = false;
        state.errorList = payload;
        toast.error(payload);
      });
  },
});

export const { clearShelterState } = shelterSlice.actions;
export default shelterSlice.reducer;
