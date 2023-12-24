import { Avatar, Modal, Tabs } from "antd";
import {
  ChangeEmailForm,
  ChangePasswordForm,
  DeleteAccountForm,
} from "../auth/AccountCRUD";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FileField, TextArea, TextField } from "..";
import { Form, Formik } from "formik";
import {
  createShelter,
  deleteShelter,
  updateShelter,
} from "../../features/shelter/shelterSlice";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "..";
import { useState } from "react";
import { validateShelter } from "../../validators";

const ShelterForm = ({ initialValues, shelterId }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((store) => store.shelter);

  const { TabPane } = Tabs;

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="container rounded-3xl bg-black/[0.04] p-8">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Profil" key="1">
          <Formik
            initialValues={initialValues}
            validationSchema={validateShelter}
            onSubmit={(values) => {
              if (shelterId) {
                const updatedValues = {};
                for (const key in values) {
                  if (values[key] !== initialValues[key]) {
                    updatedValues[key] = values[key];
                  }
                }
                dispatch(
                  updateShelter({ id: shelterId, values: updatedValues }),
                );
              } else {
                dispatch(createShelter(values));
              }
            }}
          >
            {({ values, isValid }) => (

                <Form id="form" encType="multipart/form-data">
                  <div className="grid grid-cols-3 gap-8">
                    <div className="flex items-center justify-center">
                      <div className="relative flex h-[250px] w-[250px] justify-center rounded-[50%] border-2 border-solid border-cherry bg-rosewater">
                        <Avatar
                          alt="user"
                          src={
                            values?.image !== initialValues?.image &&
                            values?.image instanceof File
                              ? URL.createObjectURL(values?.image)
                              : values?.image
                                ? values?.image
                                : require("../../assets/user_placeholder.jpg")
                          }
                          className="flex h-full w-full items-center justify-center bg-cherry-disabled"
                        />
                        <label htmlFor="image">
                          <div className="absolute left-[5%] top-0 cursor-pointer rounded-xl bg-cherry p-2">
                            <FaPlus className="text-cream" size="24px" />
                          </div>
                        </label>
                        <FileField
                          name="image"
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-black">
                        Lokalizacja
                      </h3>
                      <TextField
                        name="street_address"
                        type="text"
                        label="Ulica*"
                      />
                      <TextField
                        name="postal_code"
                        type="text"
                        maxLength="6"
                        label="Kod pocztowy*"
                      />
                      <TextField name="city" type="text" label="Miasto*" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-black">Kontakt</h3>
                      <div>
                        <TextField name="email" type="email" label="E-mail" />
                        <TextField
                          name="phone_number"
                          type="text"
                          label="Numer telefonu*"
                        />
                        <TextField
                          name="website"
                          type="url"
                          label="Strona internetowa"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-black">
                        Dane schroniska
                      </h3>
                      <div>
                        <TextField name="name" type="text" label="Nazwa*" />
                        <TextField name="nip" type="text" label="NIP*" />
                        <TextField name="krs" type="text" label="KRS" />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <h3 className="text-2xl font-bold text-black">Opis</h3>
                      <TextArea name="description" />
                    </div>

                    <div className="col-span-3 flex">
                      <p className="font-sans text-lg text-cherry">
                        * - pola obowiązkowe
                      </p>
                    </div>

                    <div className="col-span-3 mt-2 flex justify-evenly">
                      {shelterId && (
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
                              <p className="font-sans text-black">
                                Usunięcia profilu nie można cofnąć
                              </p>
                            </div>

                            <div className="mt-2 flex justify-center">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  dispatch(deleteShelter(shelterId))
                                }
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
                  </div>
                </Form>
            )}
          </Formik>
        </TabPane>
        <TabPane tab="Konto" key="2">
          <div className="flex flex-col">
            <div className="grid grid-cols-2">
              <ChangeEmailForm />
              <ChangePasswordForm />
            </div>
            <DeleteAccountForm />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ShelterForm;
