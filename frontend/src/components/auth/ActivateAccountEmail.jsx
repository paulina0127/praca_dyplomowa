import { useEffect, useState } from "react";

import { BsSendCheck } from "react-icons/bs";
import { Modal } from "antd";

const ActivateAccountEmail = ({ open, email }) => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <Modal
      open={openModal}
      onCancel={closeModal}
      className="font-sans"
      footer={null}
      centered
    >
      <div className="mb-2 flex items-center gap-2 text-cherry">
        <h1 className="text-3xl font-bold">Konto zostało utworzone</h1>
        <BsSendCheck size="32px" />
      </div>

      <div className="my-4">
        <p className="font-sans text-base text-black">
          Link aktywacyjny wysłaliśmy na adres:
        </p>
        <p className="text-center text-xl text-cherry">{email}</p>
      </div>
    </Modal>
  );
};

export default ActivateAccountEmail;
