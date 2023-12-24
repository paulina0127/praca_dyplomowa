import api from "../../utils/api";
import { clearShelterState } from "./shelterSlice";

export const getShelterThunk = async (id, thunkAPI) => {
  try {
    const response = await api.get(`/shelters/${id}`);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const createShelterThunk = async (values, thunkAPI) => {
  const config = {
    headers: { ...api.defaults.headers, "Content-Type": "multipart/form-data" },
  };

  try {
    const response = await api.post(`/shelters`, values, config);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const updateShelterThunk = async ({ id, values }, thunkAPI) => {
  const config = {
    headers: { ...api.defaults.headers, "Content-Type": "multipart/form-data" },
  };

  try {
    const response = await api.patch(`/shelters/${id}`, values, config);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const deleteShelterThunk = async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/shelters/${id}`);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const listSheltersThunk = async (_, thunkAPI) => {
  try {
    const response = await api.get(`/shelters`);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};
