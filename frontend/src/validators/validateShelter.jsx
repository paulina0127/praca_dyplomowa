import { object, string } from "yup";

const validateShelter = object({
  name: string()
    .required("Nazwa jest obowiązkowe")
    .max(255, "Imię może mieć maksymalnie 255 znaków."),
  email: string().email("To nie jest prawidłowy adres email"),
  phone_number: string().matches(
    /^\+\d{11}$/,
    "Numer telefonu musi być w formacie +XX XXXXXXXXX",
  ),
  street: string()
    .required("Pole ulica jest wymagane.")
    .matches(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-/]+$/,
      "Pole ulica może składać się tylko z liter, cyfr, spacji, myślnika i ukośnika.",
    )
    .max(255, "Pole ulica może mieć maksymalnie 255 znaków."),
  postal_code: string()
    .matches(/^\d{2}-\d{3}$/, "Kod pocztowy powinien być w formacie XX-XXX.")
    .required("Kod pocztowy jest wymagany")
    .max(6, "Kod pocztowy powinien być w formacie XX-XXX."),
  city: string()
    .matches(
      /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/,
      "Miejscowość powinna składać się tylko z liter.",
    )
    .required("Miejscowość jest wymagana")
    .max(255, "Pole miejscowość może mieć maksymalnie 255 znaków."),
});

export default validateShelter;
