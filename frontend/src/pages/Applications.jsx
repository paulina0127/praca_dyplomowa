import { FaInfoCircle, FaPaw, FaUser } from "react-icons/fa";
import { Loader, Pagination } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import { listApplications } from "../features/application/applicationSlice";

const Applications = () => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { isLoading, count, applications } = useSelector(
    (store) => store.application,
  );
  const [openModal, setOpenModal] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    search: "",
    ordering: "",
    status: "",
    animal: "",
  });

  const updateParams = (newParams) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const handleClickBack = () => {
    updateParams({ page: params.page - 1 });
  };

  const handleClickForward = () => {
    updateParams({ page: params.page + 1 });
  };

  useEffect(() => {
    dispatch(listApplications(params));
  }, []);

  return (
    <section className="section flex">
      <div className="container grid grid-rows-[min-content,auto,min-content]">
        <h1 className="text-center text-3xl font-bold">Aplikacje o adopcję</h1>

        {isLoading ? (
          <Loader />
        ) : applications.length > 0 ? (
          <>
            <div className="my-8 flex flex-col justify-items-center gap-8">
              {applications?.map((application, index) => (
                <div
                  key={application?.id}
                  className="grid  grid-cols-6 items-center justify-between rounded-3xl bg-black/[0.04] p-2"
                >
                  <div className="flex justify-center">
                    <img
                      src={
                        application?.animal?.images?.length > 0
                          ? application?.animal?.images[0]?.image
                          : require("../assets/animal_placeholder.png")
                      }
                      alt="animal"
                      className="h-[50px] w-[50px] rounded-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {" "}
                    <FaPaw className="text-xl text-cherry" />
                    <p>{application?.animal?.name}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {" "}
                    <FaUser className="text-xl text-cherry" />
                    <p>
                      {application?.first_name} {application?.last_name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {" "}
                    <IoTime className="text-2xl text-cherry" />
                    <p>
                      {new Date(application?.added_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {" "}
                    <FaInfoCircle className="text-xl text-cherry" />
                    <p>{application?.status}</p>
                  </div>

                  <Link
                    to={`/aplikacje/${application?.id}`}
                    className="btn btn-primary"
                  >
                    Szczegóły
                  </Link>
                </div>
              ))}
            </div>

            <Pagination
              page={params.page}
              pageSize={pageSize}
              count={count}
              clickBack={handleClickBack}
              clickForward={handleClickForward}
            />
          </>
        ) : (
          <p className="my-2 text-center">Brak wyników do wyświetlenia</p>
        )}
      </div>
    </section>
  );
};

export default Applications;
