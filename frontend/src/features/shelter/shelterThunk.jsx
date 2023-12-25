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

export const listSheltersThunk = async (filters, thunkAPI) => {
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
    const response = await api.get(`/shelters${query}`);
    thunkAPI.dispatch(clearShelterState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};
