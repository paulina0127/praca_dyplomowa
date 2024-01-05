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
        state.shelter = payload;
      })
      .addCase(getShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas pobierania danych schroniska");
      })

      // Create
      .addCase(createShelter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShelter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shelter = payload;
        toast.success(
          "Pomyślnie utworzono profil schroniska. Proszę czekać na zweryfikowanie profilu.",
        );
        window.location.reload();
      })
      .addCase(createShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas tworzenia profilu schroniska");
      })

      // Update
      .addCase(updateShelter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShelter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shelter = payload;
        toast.success("Pomyślnie zapisano zmiany");
      })
      .addCase(updateShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas aktualizowania profilu schroniska");
      })

      // Delete
      .addCase(deleteShelter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShelter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shelter = {};
        window.location.reload();
      })
      .addCase(deleteShelter.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas usuwania profilu schroniska");
      })

      // List
      .addCase(listShelters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listShelters.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shelters = payload.results;
        state.count = payload.count;
      })
      .addCase(listShelters.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas pobierania listy schronisk");
      });
  },
});

export const { clearShelterState } = shelterSlice.actions;
export default shelterSlice.reducer;
