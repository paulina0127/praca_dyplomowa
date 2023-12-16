import { useDispatch, useSelector } from "react-redux";

import { Loader } from "..";
import ShelterForm from "./ShelterForm";
import { getShelter } from "../../features/shelter/shelterSlice";
import { useEffect } from "react";

export const ShelterCreate = ({ user }) => {
  const initialValues = {
    name: "",
    nip: "",
    krs: "",
    email: "",
    phone_number: "",
    website: "",
    street_address: "",
    postal_code: "",
    city: "",
    description: "",
    image: null,
  };

  return (
    <ShelterForm user={user} initialValues={initialValues}>
      <h2>Profil schroniska</h2>
    </ShelterForm>
  );
};

export const ShelterUpdate = ({ user, shelterId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShelter(shelterId));
  }, []);

  const { isLoading, shelter, errorGet } = useSelector(
    (store) => store.shelter,
  );

  if (isLoading) return <Loader />;
  if (!shelter || Object.keys(shelter).length === 0) return null;

  const initialValues = shelter;

  return (
    <ShelterForm
      shelterExists={true}
      shelterId={shelterId}
      user={user}
      initialValues={initialValues}
    />
  );
};
