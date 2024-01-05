import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { Carousel, Tooltip } from "antd";
import { Link, useParams } from "react-router-dom";
import { MdOutlineBloodtype, MdTimelapse } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { ApplicationCreate } from "../components/application/ApplicationCRUD";
import { IoIosResize } from "react-icons/io";
import { Loader } from "../components";
import { PiSyringe } from "react-icons/pi";
import React from "react";
import { getAnimal } from "../features/animal/animalSlice";

const Animal = () => {
  const dispatch = useDispatch();
  const { isLoading, animal } = useSelector((store) => store.animal);
  const { user } = useSelector((store) => store.user);
  const animal_id = useParams().id;
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getAnimal(animal_id));
  }, []);

  return isLoading ? (
    <Loader />
  ) : animal ? (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-3 gap-8 rounded-xl bg-black/[0.04] p-8">
          {animal?.images?.length > 0 ? (
            <Carousel className="animal-gallery rounded-3xl">
              {animal?.images?.map((el, index) => (
                <div key={index}>
                  <img
                    src={el?.image}
                    alt={`animal ${index + 1}`}
                    className="h-full w-full rounded-3xl object-cover"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <img
              src={require("../assets/animal_placeholder.png")}
              alt="animal"
              className="h-[300px] w-full rounded-3xl object-cover"
            />
          )}

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{animal?.name}</h1>
            <p>Dodano: {new Date(animal?.added_at).toLocaleDateString()}</p>

            <div className="mt-5 flex h-full flex-col justify-evenly text-lg font-bold text-cherry">
              <Tooltip placement="topLeft" title="Płeć">
                <div className="flex items-center gap-2">
                  {animal?.sex === "Samica" ? (
                    <div className="rounded-xl bg-rose p-2">
                      <BsGenderFemale />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-rose p-2">
                      <BsGenderMale />
                    </div>
                  )}{" "}
                  {animal?.sex}
                </div>
              </Tooltip>

              <Tooltip placement="topLeft" title="Rasa">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-rose p-2">
                    <MdOutlineBloodtype />
                  </div>
                  {animal?.breed?.name}
                </div>
              </Tooltip>

              <Tooltip placement="topLeft" title="Wiek">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-rose p-2">
                    <MdTimelapse />
                  </div>
                  {animal?.age}
                </div>
              </Tooltip>

              <Tooltip placement="topLeft" title="Wielkość">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-rose p-2">
                    <IoIosResize />
                  </div>
                  {animal?.size}
                </div>
              </Tooltip>

              <Tooltip
                placement="topLeft"
                title="Wysterelizowana / wykastrowany"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-rose p-2">
                    <PiSyringe />
                  </div>
                  {animal?.sex === "Samica"
                    ? animal?.spayed_neutered
                      ? "Wysterelizowana"
                      : "Niewysterylizowana"
                    : animal?.spayed_neutered
                      ? "Wykastrowany"
                      : "Niewykastrowany"}
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Link to={`/schroniska/${animal?.shelter?.id}`}>
              <h2 className="text-center text-xl font-bold hover:text-cherry">
                {animal?.shelter?.name}
              </h2>
            </Link>

            <div className="max-h-[150px] max-w-[150px]">
              <img
                src={
                  animal?.shelter?.image
                    ? animal?.shelter?.image
                    : require("../assets/user_placeholder.jpg")
                }
                alt="shelter"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <p>
              {animal?.shelter?.street_address},{" "}
              <span className="font-bold">{animal?.shelter?.city}</span>
            </p>
            {!user && (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setOpenModal(true)}
                >
                  Aplikuj o adopcję
                </button>
                <ApplicationCreate
                  openModal={openModal}
                  closeModal={() => setOpenModal(false)}
                  animalId={animal?.id}
                />
              </>
            )}
          </div>
        </div>

        {(animal?.energy_level ||
          animal?.trained ||
          animal?.accepts_children != null ||
          animal?.accepts_animals?.length > 0 ||
          animal?.medical_needs?.length > 0 ||
          animal?.temperament?.length > 0 ||
          animal?.activities?.length > 0 ||
          animal?.description) && (
          <div className="flex flex-col p-8">
            <h2 className="mb-2 text-2xl font-bold text-cherry">
              Szczegóły dotyczące zwierzęcia
            </h2>
            {animal.energy_level && (
              <p>
                <span className="font-bold">Poziom aktywności:</span>{" "}
                {animal.energy_level}
              </p>
            )}
            {animal.trained && (
              <p>
                <span className="font-bold">Wytrenowany:</span>{" "}
                {animal.trained ? "Tak" : "Nie"}
              </p>
            )}
            {animal.accepts_children != null && (
              <p>
                <span className="font-bold">Akceptuje dzieci:</span>{" "}
                {animal.accepts_children ? "Tak" : "Nie"}
              </p>
            )}
            {animal.accepts_animals?.length > 0 && (
              <p>
                <span className="font-bold">
                  Inne zwierzęta jakie akceptuje:
                </span>{" "}
                {animal.accepts_animals.join(", ")}
              </p>
            )}

            {animal.temperament?.length > 0 && (
              <p>
                <span className="font-bold">Temperament:</span>{" "}
                {animal.temperament.join(", ")}
              </p>
            )}
            {animal.activities?.length > 0 && (
              <p>
                <span className="font-bold">Preferencje interakcji:</span>{" "}
                {animal.activities.join(", ")}
              </p>
            )}
            {animal.medical_needs?.length > 0 && (
              <p>
                <span className="font-bold">Problemy zdrowotne:</span>{" "}
                {animal.medical_needs.join(", ")}
              </p>
            )}

            {animal.description && (
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-bold">Opis</h3>
                <p>{animal.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  ) : null;
};

export default Animal;
