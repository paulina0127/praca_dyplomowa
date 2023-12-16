import { AnimalCard, Loader, Pagination } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { listAnimals } from "../features/animal/animalSlice";

const Animals = () => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { isLoading, count, animals } = useSelector((store) => store.animal);

  const [params, setParams] = useState({
    page: 1,
    search: "",
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
    dispatch(listAnimals());
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="text-center text-3xl font-bold">Znalezione zwierzęta</h1>

        {isLoading ? (
          <Loader />
        ) : animals.length > 0 ? (
          <>
            <div className="my-8 grid grid-cols-3 justify-items-center">
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
      </section>
    </>
  );
};

export default Animals;
