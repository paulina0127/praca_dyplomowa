import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

const ShelterCard = ({ shelter }) => {
  return (
    <div className="group relative grid h-[250px] w-[500px] grid-cols-2 rounded-3xl bg-rose">
      <img
        src={
          shelter?.image
            ? shelter?.image
            : require("../../assets/animal_placeholder.png")
        }
        alt="shelter"
        className="h-full w-full rounded-bl-3xl rounded-tl-3xl object-cover"
      />
      <div className="p-3">
        <h2 className="mb-2 text-xl font-bold">{shelter.name}</h2>
        <p>{shelter.street_address}</p>
        <p>
          {shelter.postal_code} {shelter.city}
        </p>
      </div>
      <div className="absolute inset-0 flex h-full w-full rounded-3xl bg-cherry/[0.8] text-2xl font-bold text-cream opacity-0 transition-opacity group-hover:opacity-100">
        <Link to={`/schroniska/${shelter.id}`} className="h-full w-full">
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <h1>Zobacz profil</h1>
            <FaArrowAltCircleRight size="24px" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShelterCard;
