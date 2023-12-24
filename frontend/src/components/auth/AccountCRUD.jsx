import { Form, Formik } from "formik";
import { Loader, TextField } from "..";
import {
  changeEmail,
  changePassword,
  deleteAccount,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  validateChangeEmail,
  validateChangePassword,
  validateDeleteAccount,
} from "../../validators";

export const ChangeEmailForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);

  const initialValues = {
    new_email: "",
    re_new_email: "",
    current_password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateChangeEmail}
      onSubmit={(values, { resetForm }) => {
        dispatch(changeEmail(values));
        resetForm({ values: "" });
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <h3 className="text-2xl font-bold text-black">Zmień e-mail</h3>
          <div className="p-5 pt-2">
            <TextField
              label="Nowy adres e-mail"
              name="new_email"
              type="email"
            />
            <TextField
              label="Powtórz nowy adres e-mail"
              name="re_new_email"
              type="email"
            />
            <TextField
              label="Twoje aktualne hasło"
              name="current_password"
              type="password"
            />

            <div className="mt-2 flex justify-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading | !isValid}
              >
                {isLoading ? <Loader /> : "Zapisz"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);

  const initialValues = {
    current_password: "",
    new_password: "",
    re_new_password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateChangePassword}
      onSubmit={(values, { resetForm }) => {
        dispatch(changePassword(values));
        resetForm({ values: "" });
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <h3 className="text-2xl font-bold text-black">Zmień hasło</h3>
          <div className="p-5 pt-2">
            <TextField
              label="Aktualne hasło"
              name="current_password"
              type="password"
            />

            <TextField label="Nowe hasło" name="new_password" type="password" />

            <TextField
              label="Powtórz nowe hasło"
              name="re_new_password"
              type="password"
            />

            <div className="mt-2 flex justify-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading | !isValid}
              >
                {isLoading ? <Loader /> : "Zapisz"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const DeleteAccountForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);

  return (
    <Formik
      initialValues={{ current_password: "" }}
      validationSchema={validateDeleteAccount}
      onSubmit={(values, { resetForm }) => {
        dispatch(deleteAccount(values));
        resetForm({ values: "" });
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <h3 className="text-2xl font-bold text-black">Usuń konto</h3>
          <div className="grid w-full grid-cols-2 items-center">
            <div className="p-5 pt-2">
              <TextField
                label="Wprowadź aktualne hasło"
                name="current_password"
                type="password"
              />
            </div>

            <div className="justify-self-center p-5 pt-2">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isLoading | !isValid}
              >
                {isLoading ? <Loader /> : "Usuń konto"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
