import { Field, FieldArray, Form, Formik } from "formik";
import { FileField, TextField } from "..";
import {
  createShelter,
  updateShelter,
} from "../../features/shelter/shelterSlice";
import { useDispatch, useSelector } from "react-redux";

import { BsPersonCheck } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Loader } from "..";
import { MdOutlineAdd } from "react-icons/md";
import { useState } from "react";
import { validateShelter } from "../../validators";

const ShelterForm = ({
  initialValues,
  shelterExists,
  shelterId,
  user,
  children,
}) => {
  const dispatch = useDispatch();

  const { isLoading, successCreate, errorCreate, successUpdate, errorUpdate } =
    useSelector((store) => store.shelter);

  return (
    <>
      {isLoading && <Loader />}
      {/* {successUpdate && (
        <Message variant="success">Pomyślnie zapisano zmiany.</Message>
      )}
      {successCreate && (
        <Message variant="success">Pomyślnie utworzono kartę pacjenta.</Message>
      )}
      {errorShelterUpdate && (
        <Message variant="danger">{errorShelterUpdate}</Message>
      )}
      {errorShelterCreate && (
        <Message variant="danger">{errorShelterCreate}</Message>
      )} */}

      <div className="container-bg-content">
        {children}
        <Formik
          initialValues={initialValues}
          validationSchema={validateShelter}
          onSubmit={(values) => {
            if (shelterExists) {
              const updatedValues = {};
              for (const key in values) {
                if (values[key] !== initialValues[key]) {
                  updatedValues[key] = values[key];
                }
              }
              dispatch(updateShelter(shelterId, updatedValues));
            } else {
              dispatch(createShelter(values));
            }
          }}
        >
          {({ values, isValid }) => (
            <>
              {console.log(values)}
              <Form id="form" encType="multipart/form-data">
                <div>
                  <div>
                    <div>
                      <img
                        src={
                          values?.image !== initialValues?.image &&
                          values?.image instanceof File
                            ? URL.createObjectURL(values?.image)
                            : values?.image
                              ? values?.image
                              : require("../../assets/animal_placeholder.png")
                        }
                        alt=""
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />
                      <label htmlFor="image">
                        <div>
                          <FaPlus color="#fff" />
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
                    <h3>Dane osobowe</h3>
                    <div className="twoColumnGrid">
                      <div className="formGroup">
                        <h4>
                          Nazwa <span className="form-required">*</span>
                        </h4>
                        <TextField name="name" type="text" />
                      </div>
                      <div className="formGroup">
                        <h4>E-mail</h4>
                        <TextField name="email" type="email" />
                      </div>

                      <div className="formGroup">
                        <h4>Telefon</h4>
                        <TextField name="phone_number" type="text" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3>Adres zamieszkania</h3>
                    <div className="formGroup">
                      <h4>
                        Ulica <span className="form-required">*</span>
                      </h4>
                      <TextField name="street" type="text" />
                    </div>

                    <div className="formGroup">
                      <h4>
                        Kod pocztowy <span className="form-required">*</span>
                      </h4>
                      <TextField name="postal_code" type="text" maxLength="6" />
                    </div>

                    <div className="formGroup">
                      <h4>
                        Miejscowość <span className="form-required">*</span>
                      </h4>
                      <TextField name="city" type="text" />
                    </div>
                  </div>
                </div>
              </Form>
            </>
          )}
        </Formik>

        {!shelterExists && user?.type === "Pacjent" ? (
          <div className="btnGroup" style={{ justifySelf: "end" }}>
            <button
              type="submit"
              className="btn bg-blue clr-white mx-4 mt-3"
              style={{ justifySelf: "end" }}
              form="form"
              disabled={isLoading}
            >
              "Zapisz"
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="btn bg-dark-blue clr-white mx-4 mt-3"
            style={{ justifySelf: "end" }}
            form="form"
            disabled={isLoading}
          >
            "Zapisz"
          </button>
        )}
      </div>
    </>
  );
};

export default ShelterForm;
