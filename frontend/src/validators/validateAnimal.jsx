import { object, string } from "yup";

const validateAnimal = object({
  name: string()
    .required("Imię jest obowiązkowe")
    .max(255, "Imię może mieć maksymalnie 255 znaków"),
  status: string().required("Status jest obowiązkowy"),
  sex: string().required("Płeć jest obowiązkowa"),
  age: string().required("Wiek jest obowiązkowy"),
  size: string().required("Wielkość jest obowiązkowa"),
  species: string().required("Gatunek jest obowiązkowy"),
  breed: string().required("Rasa jest obowiązkowa"),
});

export default validateAnimal;
