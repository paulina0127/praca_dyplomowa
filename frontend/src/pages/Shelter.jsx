import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { Carousel } from "antd";
import { CgWebsite } from "react-icons/cg";
import { Loader } from "../components";
import { MdOutlineEmail } from "react-icons/md";
import { getShelter } from "../features/shelter/shelterSlice";
import { listAnimals } from "../features/animal/animalSlice";

const Shelter = () => {
  const dispatch = useDispatch();
  const { isLoading, shelter } = useSelector((store) => store.shelter);
  const { animals } = useSelector((store) => store.animal);
  const shelter_id = useParams().id;
  const carouselRef = useRef(null);

  useEffect(() => {
    dispatch(getShelter(shelter_id));
    dispatch(listAnimals({ shelter: shelter_id }));
  }, []);

  const CarouselCard = ({ animal }) => {
    return (
      <Link
        to={`/zwierzęta/${animal?.id}`}
        className="flex w-[150px] hover:text-cherry"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="h-[150px] w-[150px]">
            <img
              src={
                animal?.images?.length > 0
                  ? animal?.images[0]?.image
                  : require("../assets/animal_placeholder.png")
              }
              alt="animal"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
          <h3 className="text-lg font-bold">{animal?.name}</h3>
        </div>
      </Link>
    );
  };

  return isLoading ? (
    <Loader />
  ) : shelter ? (
    <section className="section">
      {animals?.length > 0 && (
        <div className="mb-8 bg-black/[0.04] py-8 shadow-lg">
          <h1 className="mb-8 text-center text-2xl font-bold">
            Ostatnio dodane zwierzęta
          </h1>
          <div className="container flex justify-between">
            <button type="button" onClick={() => carouselRef.current.prev()}>
              <FaArrowCircleLeft
                className="text-cherry hover:text-cherry-hover"
                size="32px"
              />
            </button>
            <Carousel
              slidesToShow={animals?.length < 3 ? animals?.length : 3}
              dots={false}
              className="shelter-animals max-w-[1000px]"
              ref={carouselRef}
            >
              {animals?.slice(0, 9).map((animal, index) => (
                <CarouselCard key={animal?.id} animal={animal} />
              ))}
            </Carousel>
            <button type="button" onClick={() => carouselRef.current.next()}>
              <FaArrowCircleRight
                className="text-cherry hover:text-cherry-hover"
                size="32px"
              />
            </button>
          </div>
          <div className="mt-8 flex justify-center">
            {" "}
            <Link
              to={`/schroniska/${shelter?.id}/zwierzęta`}
              className="btn btn-primary "
            >
              Pokaż wszystkie
            </Link>
          </div>
        </div>
      )}
      <div className="container">
        <div className="grid grid-cols-3 gap-8 p-8">
          <img
            src={
              shelter?.image
                ? shelter?.image
                : require("../assets/user_placeholder.jpg")
            }
            alt="shelter"
            className="h-[300px] w-full rounded-3xl object-cover"
          />

          <div className="col-span-2 flex flex-col">
            <h1 className="text-3xl font-bold">{shelter?.name}</h1>
            <div className="flex gap-8">
              <p>NIP: {shelter?.nip}</p>
              {shelter?.krs && <p>KRS: {shelter?.krs}</p>}
            </div>

            <div className="mt-5 flex h-full flex-col gap-4 text-lg font-bold text-cherry">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-rose p-2">
                  <FiMapPin />
                </div>
                {shelter?.street_address}, {shelter?.postal_code}{" "}
                {shelter?.city}
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-rose p-2">
                  <FiPhone />
                </div>
                {shelter?.phone_number}
              </div>

              {shelter?.email && (
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-rose p-2">
                    <MdOutlineEmail />
                  </div>
                  {shelter?.email}
                </div>
              )}

              {shelter?.website && (
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-rose p-2">
                    <CgWebsite />
                  </div>
                  {shelter?.website}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-3">
            {shelter?.description && (
              <>
                <h3 className="mb-2 text-lg font-bold">Opis</h3>
                <p>{shelter?.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Shelter;
