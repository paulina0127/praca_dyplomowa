import { object, string } from "yup";

const validateResetPassword = object({
  email: string()
    .email("E-mail jest nieprawidłowy")
    .required("E-mail jest obowiązkowy"),
});

export default validateResetPassword;
