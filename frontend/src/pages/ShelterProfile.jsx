import {
  ShelterCreate,
  ShelterUpdate,
} from "../components/shelter/ShelterCRUD";

import React from "react";
import { useSelector } from "react-redux";

const ShelterProfile = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <section className="section">
      {user?.profile ? (
        <ShelterUpdate shelterId={user?.profile?.id} />
      ) : (
        <ShelterCreate />
      )}
    </section>
  );
};

export default ShelterProfile;
