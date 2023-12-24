import { object, string } from "yup";

const validateDeleteAccount = object({
  current_password: string().required("Aktualne hasło jest obowiązkowe"),
});

export default validateDeleteAccount;
