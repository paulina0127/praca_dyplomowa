import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { Link } from "react-router-dom";

const ShelterCard = ({ shelter }) => {
  return (
    <div className="grid w-[500px] grid-cols-2 rounded-3xl bg-rose">
      <img
        src={
          shelter?.image
            ? shelter?.image
            : require("../../assets/animal_placeholder.png")
        }
        alt="shelter photo"
        className="h-full w-full rounded-bl-3xl rounded-tl-3xl object-cover "
      />
      <div className="group relative p-3">
        <h2 className="text-xl font-bold">{shelter.name}</h2>
        <p>{shelter.street_address}</p>
        <p>
          {shelter.postal_code} {shelter.city}
        </p>
        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-br-3xl rounded-tr-3xl bg-cherry text-lg font-bold text-cream opacity-0 transition-opacity group-hover:opacity-80">
          <Link to={`/schroniska/${shelter.id}`}>
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

export default ShelterCard;
