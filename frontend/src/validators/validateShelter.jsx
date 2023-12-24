import { object, string } from "yup";

const validateShelter = object({
  name: string()
    .required("Nazwa jest obowiązkowa")
    .max(255, "Nazwa może mieć maksymalnie 255 znaków"),
  email: string().email("E-mail jest nieprawidłowy"),
  website: string().url("Strona internetowa jest nieprawidłowa"),
  phone_number: string()
    .required("Numer telefonu jest obowiązkowy")
    .matches(/^\+\d{11}$/, "Numer telefonu musi być w formacie +XX XXXXXXXXX"),
  street_address: string()
    .required("Ulica jest obowiązkowa")
    .matches(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-./]+$/,
      "Ulica może składać się tylko z liter, cyfr, spacji, myślnika i ukośnika",
    )
    .max(255, "Ulica może mieć maksymalnie 255 znaków"),
  postal_code: string()
    .matches(/^\d{2}-\d{3}$/, "Kod pocztowy powinien być w formacie XX-XXX")
    .required("Kod pocztowy jest obowiązkowy")
    .max(6, "Kod pocztowy powinien być w formacie XX-XXX"),
  city: string()
    .matches(
      /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/,
      "Miejscowość powinna składać się tylko z liter",
    )
    .required("Miejscowość jest obowiązkowa")
    .max(255, "Miejscowość może mieć maksymalnie 255 znaków"),
  nip: string()
    .matches(/^[0-9]{10}$/, "NIP powinien składać się z 10 cyfr")
    .test("is-valid-nip", "NIP jest nieprawidłowy", function (value) {
      const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
      const checksum =
        value
          .slice(0, 9)
          .split("")
          .reduce(
            (acc, digit, index) => acc + parseInt(digit) * weights[index],
            0,
          ) % 11;

      return checksum === parseInt(value[9]);
    }),
  krs: string().matches(
    /^[0-9]{1,14}$/,
    "KRS powinien składać się z maksymalnie 14 cyfr",
  ),
});

export default validateShelter;
