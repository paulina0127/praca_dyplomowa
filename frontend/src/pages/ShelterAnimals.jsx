import {
  AnimalCard,
  Loader,
  Pagination,
  SelectField,
  TextField,
} from "../components";
import { Field, Form, Formik } from "formik";
import { getOrdering, setSelectField } from "../utils/functions";
import {
  orderingOptions,
  speciesOptions,
  statusOptions,
} from "../components/animal/options";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import React from "react";
import { listAnimals } from "../features/animal/animalSlice";

const ShelterAnimals = () => {
  const pageSize = 10;
  const dispatch = useDispatch();

  const { isLoading, count, animals } = useSelector((store) => store.animal);
  const { user } = useSelector((store) => store.user);

  const [openFilters, setOpenFilters] = useState(false);
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
    <>
      <section className="section flex">
        <div className="container grid grid-rows-[min-content,auto,min-content]">
          <div className="mx-8 flex justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-center text-3xl font-bold">
                Dodane zwierzęta ({count})
              </h1>
              <button
                type="button"
                className="btn border-2 border-solid border-cherry-disabled text-cherry-disabled"
                onClick={() => {
                  setOpenFilters(true);
                }}
              >
                <div className="flex items-center gap-2 font-bold">
                  <FaFilter />
                  <p>Filtry</p>
                </div>
              </button>
            </div>
            <Link to="/dodane-zwierzęta/nowe" className="btn btn-primary ">
              Dodaj nowe
            </Link>
          </div>

          {isLoading ? (
            <Loader />
          ) : animals.length > 0 ? (
            <>
              <div className="my-8 grid grid-cols-3 justify-items-center gap-8">
                {animals?.map((animal) => (
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
                ordering: values.ordering,
                status: values.status,
                species: values.species,
              });
              setOpenFilters(false);
            }}
          >
            {({ values, setFieldValue, resetForm }) => (
              <>
                <Form className="flex flex-col justify-center gap-4">
                  <div>
                    <Field
                      name="ordering"
                      value={
                        values?.ordering
                          ? getOrdering(values?.ordering)
                          : getOrdering("-added_at")
                      }
                      component={SelectField}
                      options={orderingOptions}
                      placeholder="Wybierz kolejność"
                      onChange={(value) => {
                        setFieldValue("ordering", value);
                      }}
                      label="Sortowanie"
                    />
                    <TextField
                      name="search"
                      type="search"
                      label="Imię"
                      placeholder="Wpisz imię"
                      classes="bg-cream border-[1px] border-solid border-cherry"
                    />

                    <Field
                      name="status"
                      value={
                        values?.status ? setSelectField(values?.status) : null
                      }
                      component={SelectField}
                      options={statusOptions}
                      placeholder="Wybierz status"
                      onChange={(value) => {
                        setFieldValue("status", value);
                      }}
                      label="Status"
                    />
                    <Field
                      name="species"
                      value={
                        values?.species ? setSelectField(values?.species) : null
                      }
                      component={SelectField}
                      options={speciesOptions}
                      placeholder="Wybierz gatunek"
                      onChange={(value) => {
                        setFieldValue("species", value);
                      }}
                      label="Gatunek"
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
                          ordering: "",
                          status: "",
                          species: "",
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

export default ShelterAnimals;
