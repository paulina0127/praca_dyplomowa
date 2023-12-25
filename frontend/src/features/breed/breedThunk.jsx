import api from "../../utils/api";
import { clearBreedState } from "./breedSlice";

export const listBreedsThunk = async (filters, thunkAPI) => {
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
    const response = await api.get(`/breeds${query}`);
    thunkAPI.dispatch(clearBreedState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};
