import { Form, Formik } from "formik";
import { Link, useParams } from "react-router-dom";
import { Loader, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";

import { BsPersonCheck } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Home } from ".";
import { resetPasswordConfirm } from "../features/user/userSlice";
import { validateResetPasswordConfirm } from "../validators";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isLoading, successResetPasswordConfirm } = useSelector(
    (store) => store.user,
  );

  const uid = useParams().uid;
  const token = useParams().token;

  return (
    <>
      <Home />
      <Dialog open={true} maxWidth="sm" fullWidth className="font-sans">
        <DialogContent>
          <div className="mb-2 flex items-center gap-2 text-cherry">
            <h1 className="text-3xl font-bold">Zmiana hasła</h1>
            <BsPersonCheck size="32px" />
          </div>
          <DialogContentText>
            <p className="font-sans text-black">
              {successResetPasswordConfirm
                ? "Hasło zostało zmienione."
                : "Wprowadź nowe hasło."}
            </p>
            <div className="flex justify-center">
              {successResetPasswordConfirm ? (
                <Link to="/logowanie" className="btn mt-2 bg-cherry text-cream">
                  Zaloguj się
                </Link>
              ) : (
                <>
                  <Formik
                    initialValues={{
                      new_password: "",
                      re_new_password: "",
                    }}
                    validationSchema={validateResetPasswordConfirm}
                    onSubmit={(values, { resetForm }) => {
                      const { new_password, re_new_password } = values;
                      dispatch(
                        resetPasswordConfirm({
                          uid,
                          token,
                          new_password,
                          re_new_password,
                        }),
                      );
                      resetForm({ values: "" });
                    }}
                  >
                    {({ values, isValid }) => (
                      <Form id="form">
                        <TextField
                          label="Hasło"
                          name="new_password"
                          type="password"
                          classes="bg-cream border-[1px] border-solid border-cherry"
                        />
                        <TextField
                          label="Potwierdź hasło"
                          name="re_new_password"
                          type="password"
                          classes="bg-cream border-[1px] border-solid border-cherry"
                        />
                        <div className="flex justify-center">
                          <button
                            type="submit"
                            className="btn mt-2 bg-cherry text-cream"
                          >
                            {isLoading ? <Loader /> : "Zmień hasło"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResetPassword;
