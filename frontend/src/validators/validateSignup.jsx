import { object, ref, string } from "yup";

const validateSignup = object({
  email: string()
    .email("E-mail jest nieprawidłowy")
    .required("E-mail jest obowiązkowy"),
  password: string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .matches(/[0-9]/, "Hasło musi zawierać co najmniej 1. cyfrę")
    .matches(/[A-Z]/, "Hasło musi zawierać co najmniej 1. wielką literę")
    .required("Hasło jest obowiązkowe"),
  re_password: string()
    .oneOf([ref("password"), null], "Wprowadzone hasła różnią się od siebie.")
    .required("Powtórz wprowadzone hasło"),
});

export default validateSignup;
