import { Loader, Pagination, ShelterCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { listShelters } from "../features/shelter/shelterSlice";

const Shelters = () => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { isLoading, count, shelters } = useSelector((store) => store.shelter);

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
    dispatch(listShelters());
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="text-center text-3xl font-bold">
          Współpracujące z nami schroniska
        </h1>

        {isLoading ? (
          <Loader />
        ) : shelters.length > 0 ? (
          <>
            <div className="my-8 grid grid-cols-2 justify-items-center">
              {shelters?.map((shelter, index) => (
                <ShelterCard key={shelter.id} shelter={shelter} />
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

export default Shelters;
