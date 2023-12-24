import { object, ref, string } from "yup";

const validateChangeEmail = object({
  current_password: string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .matches(/[0-9]/, "Hasło musi zawierać co najmniej 1 cyfrę")
    .matches(/[A-Z]/, "Hasło musi zawierać co najmniej 1 wielką literę")
    .required("Aktualne hasło jest obowiązkowe"),
  new_email: string()
    .email("Nowy e-mail jest nieprawidłowy")
    .required("Nowy e-mail jest obowiązkowy"),
  re_new_email: string()
    .oneOf(
      [ref("new_email"), null],
      "Wprowadzone adresy e-mail różnią się od siebie",
    )
    .email("E-mail jest nieprawidłowy")
    .required("Powtórz e-mail"),
});

export default validateChangeEmail;
