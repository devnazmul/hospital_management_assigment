import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getDashboardData } from "../../apis/auth/auth";
import CustomLoading from "../../components/CustomLoading";
import CustomToaster from "../../components/CustomToaster";
import Navbar from "../../layout/Navbar/Navbar";
import UserList from "../UserList/UserList";
import Appointment from "../Appointment/Appointment";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(
    user?.role === "assistant" ? true : false
  );
  const [data, setData] = useState();
  useEffect(() => {
    if (user?.role === "assistant") {
      setIsLoading(true);
      getDashboardData()
        .then((res) => {
          setData(res?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={"error"}
              text={`ID: #00110 - ${error?.response?.data?.message}`}
            />
          ));
          setIsLoading(false);
        });
    }
  }, []);
  return (
    <div className={`h-[calc(100vh-5rem)]`}>
      <Navbar title={"Dashboard"} />
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div className="w-full h-[calc(100vh-10rem)]">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-10`}
          >
            <div className="bg-gradient-to-tr to-blue-600 from-primary w-full h-full rounded-xl shadow-lg px-5 py-5">
              <div className="flex items-center gap-5">
                <img
                  className="w-12 h-12 object-cover rounded-lg shadow-md"
                  src={user?.profile_pic_url}
                  alt=""
                />
                <div>
                  <h1 className="text-xl font-semibold text-base-100">
                    {user?.name}
                  </h1>
                  <p className=" text-white text-xs font-medium">
                    {user?.role?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="w-full text-center mt-5 text-base-100 text-md">
                  {user?.email}
                </h3>
              </div>
            </div>

            {user?.role === "assistant" ? (
              <>
                {/* PATIENT  */}
                <div className="bg-gradient-to-tr to-blue-600 from-primary w-full h-full rounded-xl shadow-lg px-5 py-5">
                  <h1 className="text-center font-semibold text-white">
                    Patients
                  </h1>
                  <span className="text-6xl text-white font-semibold text-center w-full block">
                    {data?.patients}
                  </span>
                </div>

                {/* APPOINMENTS  */}
                <div className="bg-gradient-to-tr to-blue-600 from-primary w-full h-full rounded-xl shadow-lg px-5 py-5">
                  <h1 className="text-center font-semibold text-white">
                    Appointments
                  </h1>
                  <span className="text-6xl text-white font-semibold text-center w-full block">
                    {data?.appointments}
                  </span>
                </div>

                {/* DOCTORS  */}
                <div className="bg-gradient-to-tr to-blue-600 from-primary w-full h-full rounded-xl shadow-lg px-5 py-5">
                  <h1 className="text-center font-semibold text-white">
                    Doctors
                  </h1>
                  <span className="text-6xl text-white font-semibold text-center w-full block">
                    {data?.doctors}
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div>
            <Appointment isNeedNav={false} />
          </div>
        </div>
      )}
    </div>
  );
}
