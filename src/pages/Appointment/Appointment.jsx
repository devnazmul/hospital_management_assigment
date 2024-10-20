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
import {
  getAllAppointments,
  rejectAppointment,
} from "../../apis/appointment/appointment";
import { createNotification } from "../../apis/notification/notification";
import CreateAppointment from "../../components/CreateAppointment";
import CreateAppointmentPatient from "../../components/CreateAppointmentPatient";
import CreateAppointmentSchedule from "../../components/CreateAppointmentSchedule";
import CustomToaster from "../../components/CustomToaster";
import Table from "../../components/Table";
import Navbar from "../../layout/Navbar/Navbar";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";

export default function Appointment({ isNeedNav = true }) {
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // API RELATED
  const [totalData, setTotalData] = useState(0);

  // IS ANY CHANGE ON TABLE
  const [isUpdated, setIsUpdated] = useState(Math.random());

  useEffect(() => {
    setIsLoading(true);
    getAllAppointments()
      .then((res) => {
        setAppointments(
          res?.data.reverse().map((appointment) => ({
            id: appointment?._id,
            patient_id: appointment?.patient_id,
            patient: appointment?.patient_name,
            doctor_id: appointment?.doctor_id,
            doctor: appointment?.doctor_name,
            rawStatus: appointment?.status,
            status:
              appointment?.status === "pending" ? (
                <span className="px-3 font-semibold py-2 rounded-md text-gray-600 bg-gray-300">
                  {appointment?.status}
                </span>
              ) : appointment?.status === "approved" ? (
                <span className="px-3 font-semibold py-2 rounded-md text-green-600 bg-green-300">
                  {appointment?.status}
                </span>
              ) : appointment?.status === "rejected" ? (
                <span className="px-3 font-semibold py-2 rounded-md text-red-600 bg-red-300">
                  {appointment?.status}
                </span>
              ) : (
                <span className="px-3 font-semibold py-2 rounded-md text-blue-600 bg-blue-300">
                  {appointment?.status}
                </span>
              ),
            schedule: appointment?.schedule_date
              ? `${moment(appointment?.schedule_date, "DD-MM-YYYY").format(
                  "LL"
                )} (${convertTo12HourFormat(
                  appointment?.start_time
                )} - ${convertTo12HourFormat(appointment?.end_time)})`
              : "Not Set Yet!",
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

  const [setscheduleSelecteDoctor, setSetscheduleSelecteDoctor] = useState("");
  const [setscheduleSelectePatient, setSetscheduleSelectePatient] =
    useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState({});
  // // HANDLE DEAPPROVELETE
  const handleApprove = (id, patient_id, doctor_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedAppointment(
          appointments?.find((single) => single.id === id)
        );
        setSelectedAppointmentId(id);
        setSetscheduleSelectePatient(patient_id);
        setSetscheduleSelecteDoctor(doctor_id);
        setSchedulePopup(true);
      }
    });
  };
  // // HANDLE REJECT
  const handleReject = (id, patient_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectAppointment(id)
          .then((res) => {
            if (res) {
              createNotification({
                reciver_id: patient_id,
                title: "Your appointment is rejected!",
                message:
                  "Your appointment is rejected by the assistant please check on the appointment page",
              })
                .then((res) => {
                  setIsUpdated(false);
                  setIsUpdated(Math.random());
                  Swal.fire(
                    "Rejected!",
                    "The appointment has been rejected.",
                    "success"
                  );
                })
                .catch((error) => {
                  console.log(error);

                  toast.custom((t) => (
                    <CustomToaster
                      t={t}
                      type={"error"}
                      text={`ID: #00108 - ${error?.response?.data?.message}`}
                    />
                  ));
                });
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          });
      }
    });
  };

  const [addPopup, setAddPopup] = useState(false);
  const [schedulePopup, setSchedulePopup] = useState(false);
  const closeModal = () => setAddPopup(false);

  return (
    <>
      {isNeedNav ? (
        <nav className={``}>
          <Navbar title={"Appointments"} />
        </nav>
      ) : (
        ""
      )}
      <div className="w-full h-[85vh] md:h-[75vh] overflow-y-auto scrollbar pr-3 px-10">
        {/* ADD  */}
        <Popup
          className={`${user?.role === "assistant" && "addCustomerPopup"} ${
            user?.role === "patient" && "addAppointmentPatient"
          }`}
          open={addPopup}
          onClose={closeModal}
          position="right center"
        >
          <div className="w-full bg-base-100 h-full py-5 px-5 relative">
            <button
              onClick={() => {
                setAddPopup(false);
              }}
              className="absolute top-1 right-1"
            >
              <MdOutlineCancel className="text-error text-2xl" />
            </button>
            {user?.role === "assistant" && (
              <CreateAppointment
                setIsUpdated={setIsUpdated}
                setAddPopup={setAddPopup}
              />
            )}
            {user?.role === "patient" && (
              <CreateAppointmentPatient
                setIsUpdated={setIsUpdated}
                setAddPopup={setAddPopup}
              />
            )}
          </div>
        </Popup>

        {/* SELECT SCHEDULE  */}
        <Popup
          className={"addAppointmentPatient"}
          open={schedulePopup}
          onClose={() => {
            setSchedulePopup(false);
          }}
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

            <CreateAppointmentSchedule
              setscheduleSelecteDoctor={setscheduleSelecteDoctor}
              setIsUpdated={setIsUpdated}
              setAddPopup={setSchedulePopup}
              setscheduleSelectePatient={setscheduleSelectePatient}
              selectedAppointmentId={selectedAppointmentId}
              selectedAppointment={selectedAppointment}
            />
          </div>
        </Popup>

        <div className="flex justify-between items-center my-5">
          <h1 className={`text-2xl font-semibold`}>All Appointments</h1>
          {user?.role !== "doctor" && (
            <button
              onClick={() => setAddPopup(true)}
              className="btn btn-primary text-base-100 rounded-full w-32"
            >
              + Add New
            </button>
          )}
        </div>

        <div>
          <Table
            rows={appointments}
            cols={["status", "patient", "doctor", "schedule"]}
            isLoading={isLoading}
            acceptBtn={user?.role !== "patient"}
            rejectBtn={user?.role !== "patient"}
            handleAccept={handleApprove}
            handleReject={handleReject}
          />
        </div>
      </div>
    </>
  );
}
