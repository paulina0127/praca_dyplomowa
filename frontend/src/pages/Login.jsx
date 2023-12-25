import { Form, Formik } from "formik";
import { Loader, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import React from "react";
import { ResetPasswordEmail } from "../components";
import { isAuthenticated } from "../utils/auth";
import { login } from "../features/user/userSlice";
import { useState } from "react";
import { validateLogin } from "../validators";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);
  const [openModal, setOpenModal] = useState(false);

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <div className="flex max-h-screen">
      <div className="flex w-[30%] flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold text-cherry md:text-5xl">
          Logowanie
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validateLogin}
          onSubmit={async (values) => {
            dispatch(login(values));
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col">
              <TextField label="E-mail" name="email" type="email" />
              <TextField label="Hasło" name="password" type="password" />
              <div className="m-2 flex items-center gap-4">
                <button type="button" onClick={() => setOpenModal(true)}>
                  Nie pamiętam hasła
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading | !isValid}
                >
                  {isLoading ? <Loader /> : "Zaloguj się"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-[70%]">
        <img
          src={require("../assets/login_img.jpg")}
          alt="Pies w okularach"
          className="object-cover"
        />
      </div>
      <ResetPasswordEmail
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Login;
