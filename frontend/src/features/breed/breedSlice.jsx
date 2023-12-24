import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { listBreedsThunk } from "./breedThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  breeds: [],
};

export const listBreeds = createAsyncThunk("breed/list", listBreedsThunk);

const breedSlice = createSlice({
  name: "breed",
  initialState,
  reducers: {
    clearBreedState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // List
      .addCase(listBreeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listBreeds.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.breeds = payload.results;
        state.count = payload.count;
      })
      .addCase(listBreeds.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas pobierania listy ras");
      });
  },
});

export const { clearBreedState } = breedSlice.actions;
export default breedSlice.reducer;
