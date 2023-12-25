import {
  AnimalCard,
  BooleanField,
  Loader,
  Pagination,
  SelectField,
  TextField,
} from "../components";
import { Avatar, Modal } from "antd";
import { Field, Form, Formik } from "formik";
import { Link, useParams } from "react-router-dom";
import {
  activitiesOptions,
  ageOptions,
  energyLevelOptions,
  orderingOptions,
  sexOptions,
  sizeOptions,
  speciesOptions,
  temperamentOptions,
} from "../components/animal/options";
import { getOrdering, setSelectField } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaFilter } from "react-icons/fa6";
import React from "react";
import { getShelter } from "../features/shelter/shelterSlice";
import { listAnimals } from "../features/animal/animalSlice";
import { listBreeds } from "../features/breed/breedSlice";

const Animals = ({ filters, title }) => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { isLoading, count, animals } = useSelector((store) => store.animal);
  const { breeds } = useSelector((store) => store.breed);
  const { shelter } = useSelector((store) => store.shelter);
  const shelter_id = useParams().id;

  const [species, setSpecies] = useState("");
  const [breedOptions, setBreedOptions] = useState(breeds);

  const [openFilters, setOpenFilters] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    search: filters?.search || "",
    ordering: filters?.ordering || "",
    shelter: shelter_id || filters?.shelter || "",
    city: filters?.city || "",
    status: "Do adopcji",

    sex: filters?.sex || "",
    age: filters?.age || [],
    size: filters?.size || [],
    species: filters?.species || "",
    breed: filters?.breed || [],

    spayed_neutered: filters?.spayed_neutered || "",
    accepts_children: filters?.accepts_children || "",
    trained: filters?.trained || "",

    energy_level: filters?.energy_level || [],
    temperament: filters?.temperament || [],
    accepts_animals: filters?.accepts_animals || [],
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
    shelter_id && dispatch(getShelter(shelter_id));
  }, []);

  useEffect(() => {
    dispatch(listAnimals(params));
  }, [params]);

  useEffect(() => {
    dispatch(listBreeds({}));
  }, []);

  useEffect(() => {
    if (breeds) {
      setBreedOptions(
        breeds
          .filter((breed) => breed.species === species)
          .map((breed) => ({ value: breed.id, label: breed.name })),
      );
    }
  }, [species, breeds]);

  return (
    <>
      <section className="section flex">
        <div className="container grid grid-rows-[min-content,auto,min-content]">
          <div className="flex items-center justify-between">
            <div className="mx-8 flex items-center gap-4">
              <h1 className="text-center text-3xl font-bold">
                {title} ({count})
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
                {animals?.map((animal) => (
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
            <p className="my-8 h-fit text-center text-lg text-cherry">
              Brak wyników do wyświetlenia
            </p>
          )}
        </div>
      </section>

      <Modal
        open={openFilters}
        onCancel={() => setOpenFilters(false)}
        className="filters min-w-[1000px] font-sans"
        footer={null}
        centered
      >
        <div className="my-4">
          <Formik
            initialValues={params}
            onSubmit={(values) => {
              updateParams({
                page: 1,
                search: values.search,
                ordering: values.ordering,
                city: values.city,

                sex: values.sex,
                age: values.age,
                size: values.size,
                species: values.species,
                breed: values.breed,

                spayed_neutered: values.spayed_neutered,
                accepts_children: values.accepts_children,
                trained: values.trained,

                energy_level: values.energy_level,
                temperament: values.temperament,
                accepts_animals: values.accepts_animals,
                activities: values.activities,
              });
              setOpenFilters(false);
            }}
          >
            {({ values, setFieldValue, resetForm }) => (
              <>
                <Form className="grid grid-cols-3 gap-4">
                  <div className="col-span-3 mb-2 flex items-center gap-8 text-cherry">
                    <h1 className="text-3xl font-bold">Filtry</h1>
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
                    />
                  </div>
                  <div>
                    <TextField
                      name="search"
                      type="search"
                      label="Imię"
                      placeholder="Wpisz imię"
                      classes="bg-cream border-[1px] border-solid border-cherry"
                    />
                    {!shelter_id && (
                      <TextField
                        name="city"
                        type="text"
                        label="Miasto"
                        placeholder="Wpisz miasto"
                        classes="bg-cream border-[1px] border-solid border-cherry"
                      />
                    )}
                    <Field
                      name="sex"
                      value={values?.sex ? setSelectField(values?.sex) : null}
                      component={SelectField}
                      options={sexOptions}
                      placeholder="Wybierz płeć"
                      onChange={(value) => {
                        setFieldValue("sex", value);
                      }}
                      label="Płeć"
                    />
                    <Field
                      name="age"
                      value={values?.age}
                      mode="multiple"
                      component={SelectField}
                      options={ageOptions}
                      placeholder="Wybierz wiek"
                      onChange={(value) => {
                        setFieldValue("age", value);
                      }}
                      label="Wiek"
                    />
                    <Field
                      name="size"
                      value={values?.size}
                      mode="multiple"
                      component={SelectField}
                      options={sizeOptions}
                      placeholder="Wybierz wielkość"
                      onChange={(value) => {
                        setFieldValue("size", value);
                      }}
                      label="Wielkość"
                    />
                  </div>

                  <div>
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
                        setSpecies(value);
                      }}
                      label="Gatunek"
                    />
                    <Field
                      name="breed"
                      value={values?.breed}
                      mode="multiple"
                      component={SelectField}
                      options={breedOptions}
                      placeholder="Wybierz rasę"
                      onChange={(value) => {
                        setFieldValue("breed", value);
                      }}
                      label="Rasa"
                    />
                    <Field
                      name="spayed_neutered"
                      component={BooleanField}
                      label="Wysterelizowana / wykastrowany"
                    />
                    <Field
                      name="trained"
                      component={BooleanField}
                      label="Wytrenowany"
                    />
                    <Field
                      name="accepts_children"
                      component={BooleanField}
                      label="Akceptuje dzieci"
                    />
                  </div>

                  <div>
                    <Field
                      name="energy_level"
                      value={values?.energy_level}
                      mode="multiple"
                      component={SelectField}
                      options={energyLevelOptions}
                      placeholder="Wybierz poziom aktywności"
                      onChange={(value) => {
                        setFieldValue("energy_level", value);
                      }}
                      label="Poziom aktywności"
                    />
                    <Field
                      name="accepts_animals"
                      value={values?.accepts_animals}
                      mode="multiple"
                      component={SelectField}
                      options={speciesOptions}
                      placeholder="Wybierz zwierzęta"
                      onChange={(value) => {
                        setFieldValue("accepts_animals", value);
                      }}
                      label="Inne zwierzęta, które akceptuje"
                    />
                    <Field
                      name="temperament"
                      value={values?.temperament}
                      mode="multiple"
                      component={SelectField}
                      options={temperamentOptions}
                      placeholder="Wybierz cechy"
                      onChange={(value) => {
                        setFieldValue("temperament", value);
                      }}
                      label="Temperament"
                    />
                    <Field
                      name="activities"
                      value={values?.activities}
                      mode="multiple"
                      component={SelectField}
                      options={activitiesOptions}
                      placeholder="Wybierz interakcje"
                      onChange={(value) => {
                        setFieldValue("activities", value);
                      }}
                      label="Preferencje interakcji"
                    />
                  </div>

                  <div className="col-span-3 m-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        updateParams({
                          page: 1,
                          search: "",
                          ordering: "",
                          city: "",

                          sex: "",
                          age: [],
                          size: [],
                          species: "",
                          breed: [],

                          spayed_neutered: "",
                          accepts_children: "",
                          trained: "",

                          energy_level: [],
                          temperament: [],
                          accepts_animals: [],
                          activities: [],
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

export default Animals;
