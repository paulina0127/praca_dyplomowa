import { Form, Formik } from "formik";
import { Loader, Pagination, ShelterCard, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaFilter } from "react-icons/fa6";
import { Modal } from "antd";
import React from "react";
import { listShelters } from "../features/shelter/shelterSlice";

const Shelters = () => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { isLoading, count, shelters } = useSelector((store) => store.shelter);

  const [openFilters, setOpenFilters] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    search: "",
    city: "",
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
    dispatch(listShelters(params));
  }, [params]);

  return (
    <>
      <section className="section flex">
        <div className="container grid grid-rows-[min-content,auto,min-content]">
          <div className="mx-8 flex items-center gap-4">
            <h1 className="text-center text-3xl font-bold">
              Współpracujące z nami schroniska ({count})
            </h1>
            <button
              type="button"
              className="btn border-2 border-solid border-cherry-disabled text-cherry-disabled"
              onClick={() => setOpenFilters(true)}
            >
              <div className="flex items-center gap-2 font-bold">
                <FaFilter />
                <p>Filtry</p>
              </div>
            </button>
          </div>
          {isLoading ? (
            <Loader />
          ) : shelters.length > 0 ? (
            <>
              <div className="my-8 grid grid-cols-2 justify-items-center gap-8">
                {shelters?.map((shelter) => (
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
            <p className="my-8 h-fit text-center text-lg text-cherry">
              Brak wyników do wyświetlenia
            </p>
          )}
        </div>
      </section>

      <Modal
        open={openFilters}
        onCancel={() => setOpenFilters(false)}
        className="filters font-sans"
        footer={null}
        centered
      >
        <div className="mb-2 flex items-center gap-2 text-cherry">
          <h1 className="text-3xl font-bold">Filtry</h1>
        </div>

        <div className="my-4">
          <Formik
            initialValues={params}
            onSubmit={(values) => {
              updateParams({
                page: 1,
                search: values.search,
                city: values.city,
              });
              setOpenFilters(false);
            }}
          >
            {({ resetForm }) => (
              <>
                <Form className="flex flex-col justify-center gap-4">
                  <div>
                    <TextField
                      name="search"
                      type="search"
                      label="Nazwa schroniska"
                      placeholder="Wpisz nazwę"
                      classes="bg-cream border-[1px] border-solid border-cherry"
                    />
                    <TextField
                      name="city"
                      type="text"
                      label="Miasto"
                      placeholder="Wpisz miasto"
                      classes="bg-cream border-[1px] border-solid border-cherry"
                    />
                  </div>

                  <div className="m-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        updateParams({
                          page: 1,
                          search: "",
                          city: "",
                        });
                        resetForm();
                        setOpenFilters(false);
                      }}
                    >
                      Wyczyść
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Filtruj wyniki
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default Shelters;
