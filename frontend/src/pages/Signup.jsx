import { ActivateAccountEmail, Loader, TextField } from "../components";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { signup } from "../features/user/userSlice";
import { validateSignup } from "../validators";

const Signup = () => {
  const dispatch = useDispatch();
  const { isLoading, successSignup } = useSelector((store) => store.user);

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <div className="flex max-h-screen">
      <div className="flex w-[30%] flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold text-cherry md:text-5xl">
          Rejestracja
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            re_password: "",
            role: "Schronisko",
          }}
          validationSchema={validateSignup}
          onSubmit={async (values) => {
            dispatch(signup(values));
          }}
        >
          {({ isValid, values }) => (
            <>
              <Form className="flex flex-col">
                <TextField label="E-mail" name="email" type="email" />
                <TextField label="Hasło" name="password" type="password" />
                <TextField
                  label="Powtórz hasło"
                  name="re_password"
                  type="password"
                />
                <div className="m-2 flex flex-col items-center">
                  <button
                    type="submit"
                    className="btn disabled:bg-cherry-disabledd bg-cherry font-bold text-cream hover:bg-cherry-hover"
                    disabled={isLoading | !isValid}
                  >
                    {isLoading ? <Loader /> : "Zarejestruj się"}
                  </button>
                </div>
              </Form>
              <ActivateAccountEmail open={successSignup} email={values.email} />
            </>
          )}
        </Formik>
      </div>
      <div className="w-[70%]">
        <img
          src={require("../assets/signup_img.jpg")}
          alt="Kot"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
