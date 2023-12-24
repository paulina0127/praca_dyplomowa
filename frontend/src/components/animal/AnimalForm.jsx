import { BooleanField, Loader, SelectField, TextArea, TextField } from "..";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { Modal, Tabs, Upload } from "antd";
import {
  activitiesOptions,
  ageOptions,
  energyLevelOptions,
  sexOptions,
  sizeOptions,
  speciesOptions,
  statusOptions,
  temperamentOptions,
} from "./options";
import {
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from "../../features/animal/animalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import validateAnimal from "../../validators/validateAnimal";

const AnimalForm = ({ initialValues, animalId, breeds }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((store) => store.animal);
  const { TabPane } = Tabs;

  const [openModal, setOpenModal] = useState(false);
  const [species, setSpecies] = useState(initialValues?.species);
  const [breedOptions, setBreedOptions] = useState(breeds);
  const [medicalNeedsOptions, setMedicalNeedsOptions] = useState(
    initialValues?.medical_needs,
  );
  const inputRef = useRef(null);
  const [fileList, setFileList] = useState(
    initialValues?.images?.map((item) => ({
      id: item.id,
      url: item.image,
    })),
  );

  const setSelectField = (value) => {
    return { value: value, label: value };
  };

  const getBreed = (value) => {
    return breedOptions.find((option) => option.value === value);
  };

  const addOption = () => {
    const inputValue = inputRef.current.value;
    setMedicalNeedsOptions([...medicalNeedsOptions, inputValue]);
  };

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
    <div className="container rounded-3xl bg-black/[0.04] p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validateAnimal}
        onSubmit={(values) => {
          if (animalId) {
            const updatedValues = {};
            for (const key in values) {
              if (values[key] !== initialValues[key]) {
                updatedValues[key] = values[key];
              }
            }

            // Handle image upload
            updatedValues["images"] = [];

            fileList.forEach((file) => {
              if (file.originFileObj && file.originFileObj instanceof File) {
                updatedValues["images"].push(file.originFileObj);
              } else {
                updatedValues["images"].push(file.id);
              }
            });

            dispatch(updateAnimal({ id: animalId, values: updatedValues }));
          } else {
            fileList.forEach((file) => {
              if (file.originFileObj && file.originFileObj instanceof File) {
                values["images"].push(file.originFileObj);
              }
            });

            dispatch(createAnimal(values));
          }
        }}
      >
        {({ values, isValid, setFieldValue }) => (
          <Form id="form" encType="multipart/form-data">
            <Tabs defaultActiveKey="1" size="large">
              <TabPane tab="Profil" key="1">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <TextField name="name" type="text" label="Imię*" />
                    <Field
                      name="status"
                      value={
                        values?.status
                          ? setSelectField(values?.status)
                          : !animalId
                            ? setSelectField("Do adopcji")
                            : null
                      }
                      disabled={!animalId}
                      component={SelectField}
                      options={statusOptions}
                      placeholder="Wybierz status"
                      onChange={(value) => {
                        setFieldValue("status", value);
                      }}
                      label="Status*"
                    />
                    <Field
                      name="sex"
                      value={values?.sex ? setSelectField(values?.sex) : null}
                      component={SelectField}
                      options={sexOptions}
                      placeholder="Wybierz płeć"
                      onChange={(value) => {
                        setFieldValue("sex", value);
                      }}
                      label="Płeć*"
                    />
                    <Field
                      name="age"
                      value={values?.age ? setSelectField(values?.age) : null}
                      component={SelectField}
                      options={ageOptions}
                      placeholder="Wybierz wiek"
                      onChange={(value) => {
                        setFieldValue("age", value);
                      }}
                      label="Wiek*"
                    />
                    <Field
                      name="size"
                      value={values?.size ? setSelectField(values?.size) : null}
                      component={SelectField}
                      options={sizeOptions}
                      placeholder="Wybierz rozmiar"
                      onChange={(value) => {
                        setFieldValue("size", value);
                      }}
                      label="Wielkość*"
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
                      label="Gatunek*"
                    />
                    <Field
                      name="breed"
                      value={values?.breed ? getBreed(values?.breed) : null}
                      component={SelectField}
                      options={breedOptions}
                      placeholder="Wybierz rasę"
                      onChange={(value) => {
                        setFieldValue("breed", value);
                      }}
                      label="Rasa*"
                    />
                    <Field
                      name="spayed_neutered"
                      component={BooleanField}
                      label="Wysterelizowana / wykastrowany*"
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
                      value={
                        values?.energy_level
                          ? setSelectField(values?.energy_level)
                          : null
                      }
                      allowClear
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
                      allowClear
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
                      allowClear
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
                      allowClear
                      component={SelectField}
                      options={activitiesOptions}
                      placeholder="Wybierz interakcje"
                      onChange={(value) => {
                        setFieldValue("activities", value);
                      }}
                      label="Preferencje interakcji"
                    />
                    <Field
                      name="medical_needs"
                      value={values?.medical_needs}
                      mode="multiple"
                      allowClear
                      component={SelectField}
                      options={medicalNeedsOptions?.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      placeholder="Wybierz problemy zdrowotne"
                      onChange={(value) => {
                        setFieldValue("medical_needs", value);
                      }}
                      label="Problemy zdrowotne"
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <hr className="mx-2 my-1 text-black/[0.25]" />
                          <div className="mt-1 flex px-2">
                            <input
                              name="medical_need"
                              type="text"
                              placeholder="Wpisz problem zdrowotny"
                              className="w-full rounded-xl px-4 py-1 font-sans text-black/[0.5] focus-visible:outline-0"
                              ref={inputRef}
                            />
                            <button
                              type="button"
                              onClick={addOption}
                              className="p-2 text-black/[0.5]"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <h3 className="text-2xl font-bold text-black">Opis</h3>
                    <TextArea name="description" />
                  </div>

                  <div className="col-span-3 flex">
                    <p className="font-sans text-lg text-cherry">
                      * - pola obowiązkowe
                    </p>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Zdjęcia" key="2">
                <div className="flex flex-col">
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) =>
                      setFileList(newFileList)
                    }
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <FaPlus size="32px" className="text-black/[0.5]" />
                    </div>
                  </Upload>
                </div>
              </TabPane>
            </Tabs>

            <div className="col-span-3 mt-2 flex justify-evenly">
              {animalId && (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary justify-self-start"
                    onClick={() => setOpenModal(true)}
                  >
                    Usuń profil
                  </button>
                  <Modal
                    open={openModal}
                    onCancel={() => setOpenModal(false)}
                    className="font-sans"
                    footer={null}
                    centered
                  >
                    <div className="mb-2 flex items-center gap-2 text-cherry">
                      <h1 className="text-3xl font-bold">
                        Potwierdź usunięcie profilu
                      </h1>
                      <FaTrash size="32px" />
                    </div>

                    <div className="my-4">
                      <p className="font-sans text-base text-black">
                        Usunięcia profilu nie można cofnąć
                      </p>
                    </div>

                    <div className="mt-2 flex justify-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => dispatch(deleteAnimal(animalId))}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader /> : "Usuń"}
                      </button>
                    </div>
                  </Modal>
                </>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                form="form"
                disabled={isLoading || !isValid}
              >
                {isLoading ? <Loader /> : "Zapisz"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AnimalForm;
