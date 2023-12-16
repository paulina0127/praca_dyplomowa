import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BsPersonCheck } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Home } from ".";
import { Loader } from "../components";
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
      <Dialog open={true} maxWidth="sm" fullWidth className="font-sans">
        <DialogContent>
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
          <DialogContentText>
            <p className="font-sans text-black">
              {successActivateAccount
                ? "Teraz możesz się zalogować."
                : "Potwierdź, aby aktywować założone konto."}
            </p>
            <div className="flex justify-center">
              {successActivateAccount ? (
                <Link to="/logowanie" className="btn mt-2 bg-cherry text-cream">
                  Zaloguj się
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn mt-2 bg-cherry text-cream"
                  onClick={() => {
                    dispatch(activateAccount({ uid: uid, token: token }));
                  }}
                >
                  {isLoading ? <Loader /> : "Aktywuj"}
                </button>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivateAccount;
