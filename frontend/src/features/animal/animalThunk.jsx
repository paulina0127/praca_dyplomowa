import api from "../../utils/api";
import { clearAnimalState } from "./animalSlice";

export const getAnimalThunk = async (id, thunkAPI) => {
  try {
    const response = await api.get(`/animals/${id}`);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createAnimalThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);
  try {
    const response = await api.post(`/animals`, body);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateAnimalThunk = async (id, values, thunkAPI) => {
  const body = JSON.stringify(values);
  try {
    const response = await api.patch(`/animals/${id}`, body);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteAnimalThunk = async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/animals/${id}`);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const listAnimalsThunk = async (_, thunkAPI) => {
  try {
    const response = await api.get(`/animals`);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
