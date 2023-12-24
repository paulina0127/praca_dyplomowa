import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BsPersonCheck } from "react-icons/bs";
import { Home } from ".";
import { Loader } from "../components";
import { Modal } from "antd";
import { activateAccount } from "../features/user/userSlice";

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const { isLoading, successActivateAccount } = useSelector(
    (store) => store.user,
  );

  const uid = useParams().uid;
  const token = useParams().token;

  return (
    <>
      <Home />
      <Modal open={true} footer={null} centered className="font-sans">
        {successActivateAccount ? (
          <div className="mb-2 flex items-center gap-2 text-cherry">
            <h1 className="text-3xl font-bold">Konto zostało aktywowane</h1>
            <BsPersonCheck size="32px" />
          </div>
        ) : (
          <div className="mb-2 flex items-center gap-2 text-cherry">
            <h1 className="text-3xl font-bold">Aktywacja konta</h1>
            <BsPersonCheck size="32px" />
          </div>
        )}
        <p className="font-sans text-base text-black">
          {successActivateAccount
            ? "Teraz możesz się zalogować."
            : "Potwierdź, aby aktywować założone konto."}
        </p>
        <div className="mt-2 flex justify-center">
          {successActivateAccount ? (
            <Link to="/logowanie" className="btn btn-primary">
              Zaloguj się
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                dispatch(activateAccount({ uid: uid, token: token }));
              }}
            >
              {isLoading ? <Loader /> : "Aktywuj"}
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ActivateAccount;
