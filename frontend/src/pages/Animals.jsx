import { AnimalCard, Loader, Pagination } from "../components";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Avatar } from "antd";
import { getShelter } from "../features/shelter/shelterSlice";
import { listAnimals } from "../features/animal/animalSlice";

const Animals = ({ filters, title }) => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { isLoading, count, animals } = useSelector((store) => store.animal);
  const { shelter } = useSelector((store) => store.shelter);
  const shelter_id = useParams().id;

  const [params, setParams] = useState({
    page: 1,
    search: filters?.search || "",
    ordering: filters?.ordering || "",
    shelter: shelter_id || filters?.shelter || "",
    city: filters?.city || "",
    status: "Do adopcji",
    sex: filters?.sex || "",
    size: filters?.size || [],
    species: filters?.species || "",
    breed: filters?.breed || [],
    age: filters?.age || [],
    spayed_neutered: filters?.spayed_neutered || "",
    temperament: filters?.temperament || [],
    energy_level: filters?.energy_level || [],
    accepts_children: filters?.accepts_children || "",
    accepts_animals: filters?.accepts_animals || [],
    trained: filters?.trained || "",
    medical_needs: filters?.medical_needs || "",
    activities: filters?.activities || [],
  });

  const updateParams = (newParams) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const handleClickBack = () => {
    updateParams({ page: params.page - 1 });
  };

  const handleClickForward = () => {
    updateParams({ page: params.page + 1 });
  };

  useEffect(() => {
    dispatch(listAnimals(params));
    shelter_id && dispatch(getShelter(shelter_id));
  }, []);

  return (
    <section className="section flex">
      <div className="container grid grid-rows-[min-content,auto,min-content]">
        <div
          className={`flex items-center ${
            shelter_id ? "justify-between" : "justify-center"
          }`}
        >
          <h1 className="text-center text-3xl font-bold">{title}</h1>
          {shelter_id && (
            <Link to={`/schroniska/${shelter?.id}`} className="max-w-[35%]">
              <div className="flex items-center gap-4 text-2xl text-cherry hover:text-cherry-hover">
                <Avatar
                  alt="user"
                  src={
                    shelter?.image
                      ? shelter?.image
                      : require("../assets/user_placeholder.jpg")
                  }
                  className="flex h-[50px] w-[50px] items-center justify-center"
                />
                <p>{shelter?.name}</p>
              </div>
            </Link>
          )}
        </div>

        {isLoading ? (
          <Loader />
        ) : animals.length > 0 ? (
          <>
            <div className="my-8 grid grid-cols-3 justify-items-center gap-8">
              {animals?.map((animal, index) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
            <Pagination
              page={params.page}
              pageSize={pageSize}
              count={count}
              clickBack={handleClickBack}
              clickForward={handleClickForward}
            />
          </>
        ) : (
          <p className="my-2 text-center">Brak wyników do wyświetlenia</p>
        )}
      </div>
    </section>
  );
};

export default Animals;
