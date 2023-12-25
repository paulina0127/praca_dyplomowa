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

export const listApplicationsThunk = async (filters, thunkAPI) => {
  let query = "?";

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== "") {
          query += `${key}=${val}&`;
        }
      });
    } else if (value !== "") {
      query += `${key}=${value}&`;
    }
  });

  // Remove the trailing '&' character from the query string
  query = query.slice(0, -1);

  try {
    const response = await api.get(`/applications${query}`);
    thunkAPI.dispatch(clearApplicationState());

    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error?.response?.data);
  }
};
