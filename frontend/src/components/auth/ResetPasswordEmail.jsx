import { BsPersonCheck, BsSendCheck } from "react-icons/bs";
import { Form, Formik } from "formik";
import { Loader, TextField } from "..";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { resetPassword } from "../../features/user/userSlice";
import { validateResetPassword } from "../../validators";

const ResetPasswordEmail = ({ open }) => {
  const dispatch = useDispatch();
  const { isLoading, successResetPassword } = useSelector(
    (store) => store.user,
  );

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      className="font-sans"
    >
      <DialogContent>
        <div className="mb-2 flex items-center gap-2 text-cherry">
          <h1 className="text-3xl font-bold">Zmiana hasła</h1>
          {successResetPassword ? (
            <BsSendCheck size="32px" />
          ) : (
            <BsPersonCheck size="32px" />
          )}
        </div>

        <DialogContentText>
          {successResetPassword ? (
            <>
              <p className="font-sans text-black">
                Wysłalićmy Ci link do zmiany hasła. Sprawdź swoją skrzynkę
                pocztową.
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="btn mt-2 bg-cherry text-cream"
                  onClick={closeModal}
                >
                  {isLoading ? <Loader /> : "Zamknij"}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-sans text-black">
                Podaj nam swój e-mail. Wyślemy Ci link do zmiany hasła.
              </p>

              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={validateResetPassword}
                onSubmit={(values, { resetForm }) => {
                  dispatch(resetPassword(values));

                  successResetPassword && resetForm({ values: "" });
                }}
              >
                {({ values, isValid }) => (
                  <Form id="form">
                    <TextField
                      name="email"
                      type="email"
                      classes="bg-cream border-[1px] border-solid border-cherry"
                    />
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="btn mt-2 bg-cherry text-cream"
                      >
                        {isLoading ? <Loader /> : "Wyślij"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordEmail;
