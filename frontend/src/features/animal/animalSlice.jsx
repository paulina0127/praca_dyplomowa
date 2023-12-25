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
        state.animal = payload;
      })
      .addCase(getAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas pobierania danych zwierzęcia");
      })

      // Create
      .addCase(createAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnimal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.animal = payload;
        toast.success("Pomyślnie utworzono profil zwierzęcia");
        window.location.href = "/dodane-zwierzęta";
      })
      .addCase(createAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas tworzenia profilu zwierzęcia");
      })

      // Update
      .addCase(updateAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnimal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.animal = payload;
        toast.success("Pomyślnie zapisano zmiany");
      })
      .addCase(updateAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas aktualizowania profilu zwierzęcia");
      })

      // Delete
      .addCase(deleteAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnimal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.animal = {};
        window.location.href = "/dodane-zwierzęta";
      })
      .addCase(deleteAnimal.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas usuwania profilu zwierzęcia");
      })

      // List
      .addCase(listAnimals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAnimals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.animals = payload.results;
        state.count = payload.count;
      })
      .addCase(listAnimals.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Wystąpił błąd podczas pobierania listy zwierząt");
      });
  },
});

export const { clearAnimalState } = animalSlice.actions;
export default animalSlice.reducer;
