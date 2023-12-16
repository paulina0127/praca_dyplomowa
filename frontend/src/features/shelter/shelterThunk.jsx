import api from "../../utils/api";
import { clearShelterState } from "./shelterSlice";

export const getShelterThunk = async (id, thunkAPI) => {
  try {
    const response = await api.get(`/shelters/${id}`);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createShelterThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);
  try {
    const response = await api.post(`/shelters`, body);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateShelterThunk = async (id, values, thunkAPI) => {
  const body = JSON.stringify(values);
  try {
    const response = await api.patch(`/shelters/${id}`, body);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteShelterThunk = async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/shelters/${id}`);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const listSheltersThunk = async (_, thunkAPI) => {
  try {
    const response = await api.get(`/shelters`);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
