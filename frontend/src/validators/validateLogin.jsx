import { object, string } from "yup";

const validateLogin = object({
  email: string()
    .email("E-mail jest nieprawidłowy")
    .required("E-mail jest obowiązkowy"),
  password: string().required("Hasło jest obowiązkowe"),
});

export default validateLogin;
