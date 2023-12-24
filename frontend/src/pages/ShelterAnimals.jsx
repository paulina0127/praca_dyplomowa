import { AnimalCard, Loader, Pagination } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { listAnimals } from "../features/animal/animalSlice";

const ShelterAnimals = () => {
  const pageSize = 10;
  const dispatch = useDispatch();

  const { isLoading, count, animals } = useSelector((store) => store.animal);
  const { user } = useSelector((store) => store.user);

  const [params, setParams] = useState({
    page: 1,
    search: "",
    ordering: "",
    shelter: "",
    status: "",
    species: "",
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
    updateParams({ shelter: user?.profile?.id });
  }, [user]);

  useEffect(() => {
    if (params.shelter) {
      dispatch(listAnimals(params));
    }
  }, [params]);

  return (
    <section className="section flex">
      <div className="container grid grid-rows-[min-content,auto,min-content]">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-center text-3xl font-bold">
            Zwierzęta dodane do adopcji
          </h1>
          <Link
            to="/dodane-zwierzęta/nowe"
            className="text-cherry hover:text-cherry-hover"
          >
            <FaCirclePlus size="32px" />
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : animals.length > 0 ? (
          <>
            <div className="my-8 grid grid-cols-3 justify-items-center gap-8">
              {animals?.map((animal, index) => (
                <AnimalCard key={animal.id} animal={animal} shelter />
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

export default ShelterAnimals;
