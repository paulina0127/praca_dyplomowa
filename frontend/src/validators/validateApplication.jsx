import { object, string } from "yup";

const validateApplication = object({
  first_name: string()
    .required("Imię jest obowiązkowe")
    .max(255, "Imię może mieć maksymalnie 255 znaków"),
  last_name: string()
    .required("Nazwisko jest obowiązkowe")
    .max(255, "Nazwisko może mieć maksymalnie 255 znaków"),
  email: string()
    .required("E-mail jest obowiązkowy")
    .email("E-mail jest nieprawidłowy"),
  phone_number: string()
    .required("Numer telefonu jest obowiązkowy")
    .matches(/^\+\d{11}$/, "Numer telefonu musi być w formacie +XX XXXXXXXXX"),
});

export default validateApplication;
