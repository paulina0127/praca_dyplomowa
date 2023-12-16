import { useEffect, useState } from "react";

import { BsSendCheck } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ActivateAccountEmail = ({ open, email }) => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <Dialog open={openModal} maxWidth="sm" fullWidth className="font-sans">
      <DialogContent>
        <div className="mb-2 flex items-center gap-2 text-cherry">
          <h1 className="text-3xl font-bold ">Konto zostało utworzone</h1>
          <BsSendCheck size="32px" />
        </div>
        <DialogContentText>
          <div className="my-4">
            <p className="font-sans text-black">
              Link aktywacyjny wysłaliśmy na adres:
            </p>
            <p className="text-center text-xl text-cherry">{email}</p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn mt-2 bg-cherry text-cream"
              onClick={closeModal}
            >
              Zamknij
            </button>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ActivateAccountEmail;
