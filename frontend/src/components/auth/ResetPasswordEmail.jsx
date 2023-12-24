import { BsPersonCheck, BsSendCheck } from "react-icons/bs";
import { Form, Formik } from "formik";
import { Loader, TextField } from "..";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "antd";
import { resetPassword } from "../../features/user/userSlice";
import { validateResetPassword } from "../../validators";

const ResetPasswordEmail = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, successResetPassword } = useSelector(
    (store) => store.user,
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className="font-sans"
      footer={null}
      centered
    >
      <div className="mb-2 flex items-center gap-2 text-cherry">
        <h1 className="text-3xl font-bold">Zmiana hasła</h1>
        {successResetPassword ? (
          <BsSendCheck size="32px" />
        ) : (
          <BsPersonCheck size="32px" />
        )}
      </div>

      {successResetPassword ? (
        <>
          <p className="font-sans text-black">
            Wysłalićmy Ci link do zmiany hasła. Sprawdź swoją skrzynkę pocztową.
          </p>
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              className="btn mt-2 bg-cherry text-cream"
              onClick={onClose}
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
                <div className="mt-2 flex justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {isLoading ? <Loader /> : "Wyślij"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Modal>
  );
};

export default ResetPasswordEmail;
