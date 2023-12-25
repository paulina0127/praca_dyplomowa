import { AnimalCard, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import React from "react";
import { listAnimals } from "../features/animal/animalSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, animals } = useSelector((store) => store.animal);

  useEffect(() => {
    dispatch(listAnimals({ status: "Do adopcji" }));
  }, []);

  return (
    <>
      <section className="section">
        <div className="container grid grid-cols-2 items-center gap-4">
          <h1 className="text-5xl font-bold">
            Znajdź swojego wymarzonego zwierzaka <br />i daj mu nowy dom na
            zawsze!
          </h1>
          <img
            src={require("../assets/intro_img.jpg")}
            alt="dog with person on a mountain"
            className="rounded-3xl"
          />
        </div>
      </section>

      <section className="section bg-black/[0.04]">
        <div className="container">
          <h1 className="text-center text-3xl font-bold">
            Ostatnio dodane zwierzęta
          </h1>

          {isLoading ? (
            <Loader />
          ) : animals.length > 0 ? (
            <>
              <div className="my-8 grid grid-cols-3 justify-items-center gap-8">
                {animals?.slice(0, 9).map((animal) => (
                  <AnimalCard animal={animal} key={animal.id} />
                ))}
              </div>
              <div className="flex justify-center">
                <Link to="/zwierzęta" className="btn btn-primary">
                  Pokaż wszystkie
                </Link>
              </div>
            </>
          ) : (
            <p className="my-8 h-fit text-center text-lg text-cherry">
              Brak wyników do wyświetlenia
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
