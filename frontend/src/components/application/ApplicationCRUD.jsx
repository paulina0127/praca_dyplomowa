import { Avatar, Modal } from "antd";
import { BooleanField, Loader, SelectField, TextField } from "..";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { createApplication } from "../../features/application/applicationSlice";
import { speciesOptions } from "../animal/options";
import { validateApplication } from "../../validators";

export const ApplicationCreate = ({ openModal, closeModal, animalId }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.application);
  const { animal } = useSelector((store) => store.animal);

  const initialValues = {
    animal: animalId,
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    has_animals: [],
    has_children: false,
    medical_ability: false,
    active: false,
  };

  return (
    <Modal
      open={openModal}
      onCancel={closeModal}
      className="min-w-[1000px] font-sans"
      footer={null}
      centered
    >
      <div className="mb-2 flex flex-col items-center justify-center gap-2 ">
        <h1 className="text-center text-3xl font-bold text-cherry">
          Aplikacja o adopcję
        </h1>
        {animal && (
          <div className="flex items-center gap-2 rounded-xl bg-black/[0.04] px-4 py-2">
            <Avatar
              alt="animal"
              src={
                animal?.images?.length > 0
                  ? animal?.images[0]?.image
                  : require("../../assets/animal_placeholder.png")
              }
              size={50}
              className="flex items-center justify-center"
            />
            <p className="text-lg font-bold">{animal?.name}</p>
          </div>
        )}
      </div>

      <div className="my-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validateApplication}
          onSubmit={async (values) => {
            dispatch(createApplication(values));
          }}
        >
          {({ isValid, values, setFieldValue }) => (
            <>
              <Form className="grid grid-cols-2 gap-4">
                <div>
                  <TextField
                    label="Imię*"
                    name="first_name"
                    type="text"
                    classes="bg-cream border-[1px] border-solid border-cherry"
                  />
                  <TextField
                    label="Nazwisko*"
                    name="last_name"
                    type="text"
                    classes="bg-cream border-[1px] border-solid border-cherry"
                  />
                  <TextField
                    label="Numer telefonu*"
                    name="phone_number"
                    type="text"
                    classes="bg-cream border-[1px] border-solid border-cherry"
                  />
                  <TextField
                    label="E-mail*"
                    name="email"
                    type="email"
                    classes="bg-cream border-[1px] border-solid border-cherry"
                  />
                </div>
                <div>
                  <Field
                    name="has_animals"
                    value={values?.has_animals}
                    mode="multiple"
                    allowClear
                    component={SelectField}
                    options={speciesOptions}
                    placeholder="Wybierz zwierzęta"
                    onChange={(value) => {
                      setFieldValue("has_animals", value);
                    }}
                    className="application-select"
                    label="Czy posiadasz inne zwierzęta? Jak tak, to jakie?"
                  />
                  <Field
                    name="has_children"
                    component={BooleanField}
                    label="Czy posiadasz małe dzieci? (1-12 lat)*"
                  />

                  <Field
                    name="active"
                    component={BooleanField}
                    label="Czy uważasz, że potrafił/a byś zająć się zwierzęciem bardzo aktywnym fizycznie?"
                  />
                  <Field
                    name="medical_ability"
                    component={BooleanField}
                    label="Czy uważasz, że potrafił/a byś zająć się zwierzęciem z problemami zdrowotnymi?*"
                  />
                </div>
                <div className="col-span-2 m-2 flex flex-col items-center">
                  <button
                    type="submit"
                    className="btn disabled:bg-cherry-disabledd bg-cherry font-bold text-cream hover:bg-cherry-hover"
                    disabled={isLoading | !isValid}
                  >
                    {isLoading ? <Loader /> : "Aplikuj"}
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
