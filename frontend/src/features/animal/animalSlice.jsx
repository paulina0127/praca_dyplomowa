import {
  createAnimalThunk,
  deleteAnimalThunk,
  getAnimalThunk,
  listAnimalsThunk,
  updateAnimalThunk,
} from "./animalThunk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  animals: [],
  count: 0,
  animal: {},
};

export const getAnimal = createAsyncThunk("animal/get", getAnimalThunk);
export const createAnimal = createAsyncThunk(
  "animal/create",
  createAnimalThunk,
);
export const updateAnimal = createAsyncThunk(
  "animal/update",
  updateAnimalThunk,
);
export const deleteAnimal = createAsyncThunk(
  "animal/delete",
  deleteAnimalThunk,
);
export const listAnimals = createAsyncThunk("animal/list", listAnimalsThunk);

const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    clearAnimalState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get
      .addCase(getAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successGet = true;
        state.animal = payload;
      })
      .addCase(getAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successGet = false;
        state.errorGet = payload;
        toast.error(payload);
      })

      // Create
      .addCase(createAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnimal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successCreate = true;
        state.animal = payload;
      })
      .addCase(createAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successCreate = false;
        state.errorCreate = payload;
        toast.error(payload);
      })

      // Update
      .addCase(updateAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnimal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successUpdate = true;
        state.animal = payload;
      })
      .addCase(updateAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successUpdate = false;
        state.errorUpdate = payload;
        toast.error(payload);
      })

      // Delete
      .addCase(deleteAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnimal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successDelete = true;
      })
      .addCase(deleteAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successDelete = false;
        state.errorDelete = payload;
        toast.error(payload);
      })

      // List
      .addCase(listAnimals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAnimals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successList = true;
        state.animals = payload.results;
        state.count = payload.count;
      })
      .addCase(listAnimals.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successList = false;
        state.errorList = payload;
        toast.error(payload);
      });
  },
});

export const { clearAnimalState } = animalSlice.actions;
export default animalSlice.reducer;
