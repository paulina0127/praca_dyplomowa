import { Link, useParams } from "react-router-dom";
import { Modal, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FiPhone } from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import { Loader } from "../components";
import { MdChildCare } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { MdOutlineSportsFootball } from "react-icons/md";
import React from "react";
import { getApplication } from "../features/application/applicationSlice";
import { updateApplication } from "../features/application/applicationSlice";

const Application = () => {
  const dispatch = useDispatch();
  const { isLoading, application } = useSelector((store) => store.application);
  const application_id = useParams().id;
  const [openModalAccept, setOpenModalAccept] = useState(false);
  const [openModalReject, setOpenModalReject] = useState(false);

  useEffect(() => {
    dispatch(getApplication(application_id));
  }, []);

  return isLoading ? (
    <Loader />
  ) : application ? (
    <section className="section">
      <div className="container">
        <h1 className="text-center text-3xl font-bold">
          Aplikacja o adopcję nr {application?.id}
        </h1>
        <p className="text-center">
          Dodano: {new Date(application?.added_at).toLocaleDateString()}
        </p>
        <div className="my-8 flex justify-between rounded-xl bg-black/[0.04] p-8">
          <div className="flex gap-8">
            <Link
              to={`/zwierzęta/${application?.animal?.id}`}
              className="flex flex-col justify-center hover:text-cherry"
            >
              <div className="flex justify-center">
                <img
                  src={
                    application?.animal?.images?.length > 0
                      ? application?.animal?.images[0]?.image
                      : require("../assets/animal_placeholder.png")
                  }
                  alt="animal"
                  className="h-[200px] w-[200px] rounded-3xl object-cover"
                />
              </div>
              <h3 className="mt-2 text-center text-lg font-bold">
                {application?.animal?.name}
              </h3>
            </Link>

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-cherry">Adoptujący</h1>
              <p className="text-2xl font-bold">
                Imię i nazwisko: {application?.first_name}{" "}
                {application?.last_name}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <Tooltip placement="topLeft" title="Numer telefonu">
                    <div className="flex items-center gap-2 font-bold text-cherry">
                      <div className="rounded-xl bg-rose p-2">
                        <FiPhone />
                      </div>
                      {application?.phone_number}
                    </div>
                  </Tooltip>

                  <Tooltip placement="topLeft" title="E-mail">
                    <div className="flex items-center gap-2 font-bold text-cherry">
                      <div className="rounded-xl bg-rose p-2">
                        <MdOutlineEmail />
                      </div>
                      {application?.email}
                    </div>
                  </Tooltip>

                  <Tooltip
                    placement="topLeft"
                    title="Czy posiada inne zwierzęta?"
                  >
                    <div className="flex items-center gap-2 font-bold text-cherry">
                      <div className="rounded-xl bg-rose p-2">
                        <IoPawOutline />
                      </div>
                      {application?.has_animals?.length > 0
                        ? application?.has_animals.join(", ")
                        : "Nie"}
                    </div>
                  </Tooltip>
                </div>

                <div className="flex flex-col gap-4">
                  <Tooltip
                    placement="topLeft"
                    title="Czy posiada małe dzieci (1-12 lat)?"
                  >
                    <div className="flex items-center gap-2 font-bold text-cherry">
                      <div className="rounded-xl bg-rose p-2 text-lg">
                        <MdChildCare />
                      </div>
                      {application?.has_children ? "Tak" : "Nie"}
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="topLeft"
                    title="Czy zajmie się zwierzęciem bardzo aktywnym fizycznie?"
                  >
                    <div className="flex items-center gap-2 font-bold text-cherry">
                      <div className="rounded-xl bg-rose p-2">
                        <MdOutlineSportsFootball />
                      </div>
                      {application?.active ? "Tak" : "Nie"}
                    </div>
                  </Tooltip>

                  <Tooltip
                    placement="topLeft"
                    title="Czy zajmie się zwierzęciem z problemami zdrowotnymi?"
                  >
                    <div className="flex items-center gap-2 font-bold text-cherry">
                      <div className="rounded-xl bg-rose p-2">
                        <MdOutlineMedicalServices />
                      </div>
                      {application?.medical_ability ? "Tak" : "Nie"}
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {application?.status === "Złożona" ? (
            <div className="flex gap-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setOpenModalAccept(true)}
              >
                Akceptuj
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setOpenModalReject(true)}
              >
                Odrzuć
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="h-fit rounded-xl border-2 border-solid border-cherry bg-cherry px-4 py-2 font-bold text-cream">
                {application?.status}
              </div>
            </div>
          )}

          <Modal
            open={openModalAccept}
            onCancel={() => setOpenModalAccept(false)}
            className="font-sans"
            footer={null}
            centered
          >
            <div className="mb-2 flex items-center gap-2 text-cherry">
              <h1 className="text-3xl font-bold">
                Potwierdź akceptację aplikacji
              </h1>
            </div>

            <div className="my-4">
              <p className="font-sans text-base text-black">
                Zaakceptowania aplikacji o adopcję nie można cofnąć
              </p>
            </div>

            <div className="mt-2 flex justify-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  dispatch(
                    updateApplication({
                      id: application?.id,
                      values: { status: "Zaakceptowana" },
                    }),
                  )
                }
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Potwierdź"}
              </button>
            </div>
          </Modal>

          <Modal
            open={openModalReject}
            onCancel={() => setOpenModalReject(false)}
            className="font-sans"
            footer={null}
            centered
          >
            <div className="mb-2 flex items-center gap-2 text-cherry">
              <h1 className="text-3xl font-bold">
                Potwierdź odrzucenie aplikacji
              </h1>
            </div>

            <div className="my-4">
              <p className="font-sans text-base text-black">
                Odrzucenia aplikacji o adopcję nie można cofnąć
              </p>
            </div>

            <div className="mt-2 flex justify-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  dispatch(
                    updateApplication({
                      id: application?.id,
                      values: { status: "Odrzucona" },
                    }),
                  )
                }
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Potwierdź"}
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  ) : null;
};

export default Application;
