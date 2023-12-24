import { useDispatch, useSelector } from "react-redux";

import { Loader } from "..";
import ShelterForm from "./ShelterForm";
import { getShelter } from "../../features/shelter/shelterSlice";
import { useEffect } from "react";

export const ShelterCreate = () => {
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

  return <ShelterForm initialValues={initialValues} />;
};

export const ShelterUpdate = ({ shelterId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShelter(shelterId));
  }, []);

  const { isLoading, shelter } = useSelector((store) => store.shelter);

  if (isLoading) return <Loader />;
  if (!shelter || Object.keys(shelter).length === 0) return null;

  const initialValues = shelter;

  return <ShelterForm shelterId={shelterId} initialValues={initialValues} />;
};
