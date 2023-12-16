import { object, string } from "yup";

const validateResetPassword = object({
  email: string()
    .email("To nie jest prawidłowy adres email")
    .required("E-mail jest obowiązkowy"),
});

export default validateResetPassword;
