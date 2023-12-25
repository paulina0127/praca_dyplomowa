import { orderingOptions } from "../components/animal/options";

export const setSelectField = (value) => {
  return { value: value, label: value };
};

export const getOrdering = (value) => {
  return orderingOptions.find((option) => option.value === value);
};
