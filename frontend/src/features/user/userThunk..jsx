import api from "../../utils/api";

export const loadUserThunk = async (_, thunkAPI) => {
  if (localStorage.getItem("userTokens")) {
    try {
      const response = await api.get("/auth/users/me");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Wystąpił błąd podczas pobierania konta użytkownika",
      );
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
    return thunkAPI.rejectWithValue("Wystąpił błąd podczas logowania");
  }
};

export const signupThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Wystąpił błąd podczas rejestracji");
  }
};

export const activateAccountThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/activation/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Wystąpił błąd podczas aktywacji konta");
  }
};

export const resetPasswordThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/reset_password/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "Wystąpił błąd wysyłania wiadomości z linkiem do resetowania hasła",
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
    return thunkAPI.rejectWithValue("Wystąpił błąd podczas zmiany hasła");
  }
};

export const changeEmailThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/set_email/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Wystąpił błąd podczas zmiany e-maila");
  }
};

export const changePasswordThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.post("/auth/users/set_password/", body);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Wystąpił błąd podczas zmiany hasła");
  }
};

export const deleteAccountThunk = async (values, thunkAPI) => {
  const body = JSON.stringify(values);

  try {
    const response = await api.delete("/auth/users/me/", body);

    window.location.href = "/";
    localStorage.removeItem("userTokens");
    localStorage.removeItem("user");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Wystąpił błąd podczas usuwania konta");
  }
};
