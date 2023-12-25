import { AnimalCreate, AnimalUpdate } from "../components/animal/AnimalCRUD";

import React from "react";
import { useParams } from "react-router-dom";

const ShelterAnimal = ({ type }) => {
  const animal_id = useParams().id;

  return (
    <section className="section">
      {type === "update" ? (
        <AnimalUpdate animalId={animal_id} />
      ) : type === "create" ? (
        <AnimalCreate />
      ) : null}
    </section>
  );
};

export default ShelterAnimal;
