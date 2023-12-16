import { AnimalCard, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "@mui/material";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { Link } from "react-router-dom";
import { listAnimals } from "../features/animal/animalSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, animals } = useSelector((store) => store.animal);

  useEffect(() => {
    dispatch(listAnimals());
  }, []);

  return (
    <>
      <section className="container">
        <div className="grid grid-cols-2 gap-4">
          <h1 className="text-5xl font-bold">
            Znajdź swojego wymarzonego zwierzaka!
          </h1>
          <img
            src={require("../assets/intro_img.jpg")}
            alt="dog with person on a mountain"
            className="rounded-3xl"
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-center text-3xl font-bold">
          Ostatnio dodane zwierzęta
        </h1>

        {isLoading ? (
          <Loader />
        ) : animals.length > 0 ? (
          <>
            <div className="my-3 grid grid-cols-3 justify-items-center">
              {animals?.map((animal, index) => (
                <AnimalCard animal={animal} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                to="/zwierzęta"
                className="btn border-2 border-solid border-cherry bg-cherry text-cream"
              >
                Pokaż wszystkie
              </Link>
            </div>
          </>
        ) : (
          <p className="my-2 text-center">Brak wyników do wyświetlenia</p>
        )}
      </section>
    </>
  );
};

export default Home;
