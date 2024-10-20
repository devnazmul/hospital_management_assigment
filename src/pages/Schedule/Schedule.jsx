// ===========================================
// #00108
// ===========================================

import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Swal from "sweetalert2";
import { getAllSchedulesForDoctor } from "../../apis/schedule/schedule.js";
import { createNotification } from "../../apis/notification/notification";
import CreateAppointment from "../../components/CreateAppointment";
import CreateAppointmentPatient from "../../components/CreateAppointmentPatient";
import CreateAppointmentSchedule from "../../components/CreateAppointmentSchedule";
import CustomToaster from "../../components/CustomToaster";
import Table from "../../components/Table";
import Navbar from "../../layout/Navbar/Navbar";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
import CreateSchedule from "../../components/UpdateSchedule.jsx";

export default function Appointment({ isNeedNav = true }) {
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // API RELATED
  const [totalData, setTotalData] = useState(0);

  // IS ANY CHANGE ON TABLE
  const [isUpdated, setIsUpdated] = useState(Math.random());

  useEffect(() => {
    setIsLoading(true);
    getAllSchedulesForDoctor(user?.id)
      .then((res) => {
        setData2(
          res?.data?.free_slots?.map((item) => ({
            id: item?._id,
            date: moment(item?.date, "DD-MM-YYYY").format("YYYY-MM-DD"),
            start_time: item?.start_time,
            end_time: item?.end_time,
          }))
        );
        setData(
          res?.data.free_slots?.map((item) => ({
            id: item?._id,
            date: moment(item?.date, "DD-MM-YYYY").format("MMMM D, YYYY"),
            "start time": moment(item?.start_time, "HH:mm:ss").format(
              "hh:mm A"
            ),
            "end time": moment(item?.end_time, "HH:mm:ss").format("hh:mm A"),
          }))
        );
        setTotalData(res?.total);
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
  }, [isUpdated]);

  const [schedulePopup, setSchedulePopup] = useState(false);
  const closeModal = () => setSchedulePopup(false);

  return (
    <>
      {isNeedNav ? (
        <nav className={``}>
          <Navbar title={"Schedule"} />
        </nav>
      ) : (
        ""
      )}
      <div className="w-full h-[85vh] md:h-[75vh] overflow-y-auto scrollbar pr-3 px-10">
        {/* ADD  */}
        <Popup
          className={`cpp`}
          open={schedulePopup}
          onClose={closeModal}
          position="right center"
        >
          <div className="w-full bg-base-100 h-full py-5 px-5 relative">
            <button
              onClick={() => {
                setSchedulePopup(false);
              }}
              className="absolute top-1 right-1"
            >
              <MdOutlineCancel className="text-error text-2xl" />
            </button>

            <CreateSchedule
              setIsUpdated={setIsUpdated}
              setAddPopup={setSchedulePopup}
              data={data2}
            />
          </div>
        </Popup>

        <div className="flex justify-between items-center my-5">
          <h1 className={`text-2xl font-semibold`}>All Schedule</h1>
          {user?.role === "doctor" && (
            <button
              onClick={() => setSchedulePopup(true)}
              className="btn btn-primary text-base-100 rounded-full w-32"
            >
              Edit
            </button>
          )}
        </div>

        <div>
          <Table
            rows={data}
            cols={["date", "start time", "end time"]}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
