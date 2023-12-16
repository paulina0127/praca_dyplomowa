import api from "../../utils/api";

export const loadUserThunk = async (_, thunkAPI) => {
  if (localStorage.getItem("userTokens")) {
    try {
      const response = await api.get("/auth/users/me");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Błąd pobierania konta użytkownika");
    }
  } else {
    return;
  }
};

export const loginThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/jwt/create/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Błąd logowania");
  }
};

export const signupThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Błąd rejestracji");
  }
};

export const activateAccountThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/activation/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Błąd aktywacji konta");
  }
};

export const resetPasswordThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/reset_password/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "Błąd wysyłania wiadomości z linkiem do resetowania hasła",
    );
  }
};

export const resetPasswordConfirmThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post(
      "/auth/users/reset_password_confirm/",
      body,
    );

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Błąd tworzenia nowego hasła");
  }
};
