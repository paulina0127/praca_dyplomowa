import { FaInfoCircle, FaPaw, FaUser } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { Loader, Pagination, SelectField, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaFilter } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import React from "react";
import { listAnimals } from "../features/animal/animalSlice";
import { listApplications } from "../features/application/applicationSlice";
import { setSelectField } from "../utils/functions";
import { statusOptions } from "../components/application/options";

const Applications = () => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { isLoading, count, applications } = useSelector(
    (store) => store.application,
  );
  const { animals } = useSelector((store) => store.animal);
  const { user } = useSelector((store) => store.user);

  const [openFilters, setOpenFilters] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    search: "",
    status: "",
    animal: "",
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

  const getAnimal = (value) => {
    return animals.find((animal) => animal.id === value);
  };

  useEffect(() => {
    if (user.profile) {
      dispatch(listApplications(params));
    }
  }, [params]);

  useEffect(() => {
    if (user.profile) {
      dispatch(listAnimals({ shelter: user?.profile?.id }));
    }
  }, [user]);

  return (
    <>
      <section className="section flex">
        <div className="container grid grid-rows-[min-content,auto,min-content]">
          <div className="mx-8 flex items-center gap-4">
            <h1 className="text-center text-3xl font-bold">
              Aplikacje o adopcję ({count})
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
          ) : applications.length > 0 ? (
            <>
              <div className="my-8 flex flex-col justify-items-center gap-8">
                {applications?.map((application) => (
                  <div
                    key={application?.id}
                    className="grid  grid-cols-6 items-center justify-between rounded-3xl bg-black/[0.04] p-2"
                  >
                    <div className="flex justify-center">
                      <img
                        src={
                          application?.animal?.images?.length > 0
                            ? application?.animal?.images[0]?.image
                            : require("../assets/animal_placeholder.png")
                        }
                        alt="animal"
                        className="h-[50px] w-[50px] rounded-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {" "}
                      <FaPaw className="text-xl text-cherry" />
                      <p>{application?.animal?.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {" "}
                      <FaUser className="text-xl text-cherry" />
                      <p>
                        {application?.first_name} {application?.last_name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {" "}
                      <IoTime className="text-2xl text-cherry" />
                      <p>
                        {new Date(application?.added_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {" "}
                      <FaInfoCircle className="text-xl text-cherry" />
                      <p>{application?.status}</p>
                    </div>

                    <Link
                      to={`/aplikacje/${application?.id}`}
                      className="btn btn-primary"
                    >
                      Szczegóły
                    </Link>
                  </div>
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
                status: values.status,
                animal: values.animal,
              });
              setOpenFilters(false);
            }}
          >
            {({ values, setFieldValue, resetForm }) => (
              <>
                <Form className="flex flex-col justify-center gap-4">
                  <div>
                    <TextField
                      name="search"
                      type="search"
                      label="Aplikant"
                      placeholder="Wpisz imię i nazwisko"
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
                      name="animal"
                      value={
                        values?.animal
                          ? {
                              value: getAnimal(values?.animal)?.id,
                              label: getAnimal(values?.animal)?.name,
                            }
                          : null
                      }
                      component={SelectField}
                      options={animals?.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      placeholder="Wybierz zwierzę"
                      onChange={(value) => {
                        setFieldValue("animal", value);
                      }}
                      label="Zwierzę"
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
                          status: "",
                          animal: "",
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

export default Applications;
