import api from "../../utils/api";
import { clearApplicationState } from "./applicationSlice";

export const getApplicationThunk = async (id, thunkAPI) => {
  try {
    const response = await api.get(`/applications/${id}`);
    thunkAPI.dispatch(clearApplicationState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const createApplicationThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post(`/applications`, body);
    thunkAPI.dispatch(clearApplicationState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const updateApplicationThunk = async ({ id, values }, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.patch(`/applications/${id}`, body);
    thunkAPI.dispatch(clearApplicationState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const deleteApplicationThunk = async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/applications/${id}`);
    thunkAPI.dispatch(clearApplicationState());

    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const listApplicationsThunk = async (_, thunkAPI) => {
  try {
    const response = await api.get(`/applications`);
    thunkAPI.dispatch(clearApplicationState());

    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error?.response?.data);
  }
};
