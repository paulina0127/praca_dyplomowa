import api from "../../utils/api";
import { clearAnimalState } from "./animalSlice";

export const getAnimalThunk = async (id, thunkAPI) => {
  try {
    const response = await api.get(`/animals/${id}`);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const createAnimalThunk = async (values, thunkAPI) => {
  const config = {
    headers: { ...api.defaults.headers, "Content-Type": "multipart/form-data" },
  };

  const {
    temperament,
    accepts_animals,
    activities,
    medical_needs,
    images,
    ...body
  } = values;

  values?.temperament
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`temperament[${index}]`] = item;
    });

  values?.accepts_animals
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`accepts_animals[${index}]`] = item;
    });

  values?.activities
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`activities[${index}]`] = item;
    });

  values?.medical_needs
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`medical_needs[${index}]`] = item;
    });

  values?.images
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`images[${index}]`] = item;
    });

  try {
    const response = await api.post(`/animals`, body, config);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const updateAnimalThunk = async ({ id, values }, thunkAPI) => {
  const config = {
    headers: { ...api.defaults.headers, "Content-Type": "multipart/form-data" },
  };

  const {
    temperament,
    accepts_animals,
    activities,
    medical_needs,
    images,
    ...body
  } = values;

  values?.temperament
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`temperament[${index}]`] = item;
    });

  values?.accepts_animals
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`accepts_animals[${index}]`] = item;
    });

  values?.activities
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`activities[${index}]`] = item;
    });

  values?.medical_needs
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`medical_needs[${index}]`] = item;
    });

  values?.images
    ?.filter((item) => item !== "")
    .forEach((item, index) => {
      body[`images[${index}]`] = item;
    });

  try {
    const response = await api.patch(`/animals/${id}`, body, config);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const deleteAnimalThunk = async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/animals/${id}`);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};

export const listAnimalsThunk = async (filters, thunkAPI) => {
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
    const response = await api.get(`/animals${query}`);
    thunkAPI.dispatch(clearAnimalState());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
};
