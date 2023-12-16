import {
  ShelterCreate,
  ShelterUpdate,
} from "../components/shelter/ShelterCRUD";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ShelterPanel = ({ type }) => {
  const { user } = useSelector((store) => store.user);

  return (
    <section className="container">
      {user?.profile ? (
        <ShelterUpdate user={user} shelterId={user?.profile?.id} />
      ) : (
        <ShelterCreate user={user} />
      )}
    </section>
  );
};

export default ShelterPanel;
