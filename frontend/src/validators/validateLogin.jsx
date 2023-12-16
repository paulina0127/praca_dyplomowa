import { object, string } from "yup";

const validateLogin = object({
  email: string()
    .email("To nie jest prawidłowy e-mail")
    .required("E-mail jest obowiązkowy"),
  password: string().required("Hasło jest obowiązkowe"),
});

export default validateLogin;
