import api from "../../utils/api";
import { clearBreedState } from "./breedSlice";

export const listBreedsThunk = async (_, thunkAPI) => {
  try {
    const response = await api.get("/breeds");
    thunkAPI.dispatch(clearBreedState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};
