import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { Link } from "react-router-dom";

const AnimalCard = ({ animal }) => {
  return (
    <div className="grid w-[300px] grid-cols-2 rounded-3xl bg-rose">
      <img
        src={
          animal?.images[0]?.image
            ? animal?.images[0]?.image
            : require("../../assets/animal_placeholder.png")
        }
        alt="animal photo"
        className="h-full w-full rounded-bl-3xl rounded-tl-3xl object-cover "
      />
      <div className="group relative p-3">
        <h2 className="text-xl font-bold">{animal.name}</h2>
        <p>Płeć: {animal.sex}</p>
        <p>Wiek: {animal.age}</p>
        <p>Wielkosć: {animal.size}</p>
        <div className="mt-2 flex rounded-xl bg-rosewater p-1">
          <IoIosPin size="24px" />
          <p className="font-bold"> {animal.shelter.city}</p>
        </div>
        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-br-3xl rounded-tr-3xl bg-cherry text-lg font-bold text-cream opacity-0 transition-opacity group-hover:opacity-80">
          <Link to={`/zwierzęta/${animal.id}`}>
            <div className="flex flex-col items-center gap-2">
              <p>Zobacz profil</p>
              <FaArrowAltCircleRight size="24px" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
