import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { Link } from "react-router-dom";
import React from "react";

const AnimalCard = ({ animal, shelter }) => {
  return (
    <div className="group relative grid h-[200px] w-[350px] grid-cols-2 rounded-3xl bg-rose">
      <img
        src={
          animal?.images?.length > 0
            ? animal?.images[0]?.image
            : require("../../assets/animal_placeholder.png")
        }
        alt="animal"
        className="h-full w-full overflow-auto rounded-bl-3xl rounded-tl-3xl object-cover"
      />
      <div className="flex flex-col justify-between p-3">
        <div>
          <h2 className="mb-2 text-xl font-bold">{animal.name}</h2>
          <p>Płeć: {animal.sex}</p>
          <p>Wiek: {animal.age}</p>
          <p>Wielkość: {animal.size}</p>
        </div>
        <div className="mt-2 flex rounded-xl bg-rosewater p-1">
          <IoIosPin size="24px" />
          <p className="font-bold"> {animal.shelter.city}</p>
        </div>
      </div>
      <div className="absolute inset-0 flex h-full w-full rounded-3xl bg-cherry/[0.8] text-2xl font-bold text-cream opacity-0 transition-opacity group-hover:opacity-100">
        {shelter ? (
          <Link to={`/zwierzęta/${animal.id}/edycja`} className="h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <h1>Edytuj profil</h1>
              <FaArrowAltCircleRight size="24px" />
            </div>
          </Link>
        ) : (
          <Link to={`/zwierzęta/${animal.id}`} className="h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <h1>Zobacz profil</h1>
              <FaArrowAltCircleRight size="24px" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;
