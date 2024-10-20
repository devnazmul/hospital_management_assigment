import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUserByRole } from "../../apis/auth/auth";
import CustomLoading from "../../components/CustomLoading";
import CustomToaster from "../../components/CustomToaster";
import DoctorCard from "../../components/DoctorCard";
import Navbar from "../../layout/Navbar/Navbar";
import Popup from "reactjs-popup";
import { MdOutlineCancel } from "react-icons/md";
import CreateDoctor from "../../components/CreateDoctor";

export default function Doctor() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isIsUpdated, setIsIsUpdated] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    getUserByRole("doctor")
      .then((res) => {
        setData(
          res?.data.map((doctor) => ({
            id: doctor?._id,
            name: doctor?.name,
            email: doctor?.email,
            role: doctor?.role,
            profile: doctor?.profile_pic_url,
            schedule: doctor?.schedule || {},
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"error"}
            text={`ID: #00108 - ${error?.response?.data?.message}`}
          />
        ));
      });
  }, [isIsUpdated]);

  return (
    <>
      <Popup
        className={"addDoctorPatient"}
        open={isOpenPopup}
        onClose={() => {
          setIsOpenPopup(false);
        }}
        position="right center"
      >
        <div className="w-full bg-base-100 h-full py-5 px-5 relative">
          <button
            onClick={() => {
              setIsOpenPopup(false);
            }}
            className="absolute top-1 right-1"
          >
            <MdOutlineCancel className="text-error text-2xl" />
          </button>

          <CreateDoctor
            setIsOpenPopup={setIsOpenPopup}
            setIsIsUpdated={setIsIsUpdated}
          />
        </div>
      </Popup>
      <nav className={``}>
        <Navbar title={`Doctors`} />
      </nav>
      <div className="w-full h-[85vh] md:h-[75vh] overflow-y-auto scrollbar px-10 py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className={`text-2xl font-semibold`}>All Doctors</h1>
          <button
            onClick={() => setIsOpenPopup(true)}
            className="btn btn-primary text-base-100 rounded-full w-32"
          >
            + Add New
          </button>
        </div>
        {isLoading ? (
          <CustomLoading />
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((doctor, index) => (
              <DoctorCard
                key={index}
                data={doctor}
                setIsUpdated={setIsIsUpdated}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
