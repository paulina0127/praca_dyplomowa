import { useDispatch, useSelector } from "react-redux";

import AnimalForm from "./AnimalForm";
import { Loader } from "..";
import { getAnimal } from "../../features/animal/animalSlice";
import { listBreeds } from "../../features/breed/breedSlice";
import { useEffect } from "react";

export const AnimalCreate = () => {
  const dispatch = useDispatch();
  const { isLoading, breeds } = useSelector((store) => store.breed);

  const initialValues = {
    name: "",
    sex: "",
    size: "",
    age: "",
    spayed_neutered: false,
    species: "",
    breed: "",
    description: "",
    energy_level: "",
    accepts_childen: null,
    trained: null,
    temperament: [],
    accepts_animals: [],
    activities: [],
    medical_needs: [],
    images: [],
  };

  useEffect(() => {
    dispatch(listBreeds());
  }, []);

  if (isLoading) return <Loader />;

  return <AnimalForm initialValues={initialValues} breeds={breeds} />;
};

export const AnimalUpdate = ({ animalId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBreeds());
    dispatch(getAnimal(animalId));
  }, []);

  const { isLoading, animal } = useSelector((store) => store.animal);
  const { breeds } = useSelector((store) => store.breed);

  if (isLoading) return <Loader />;
  if (!animal || Object.keys(animal).length === 0) return null;

  const initialValues = {
    ...animal,
    breed: animal?.breed?.id,
  };
  return (
    <AnimalForm
      animalId={animalId}
      initialValues={initialValues}
      breeds={breeds}
    />
  );
};
