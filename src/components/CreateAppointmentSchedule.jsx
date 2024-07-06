import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  approveAppointment,
  updateAppointment,
} from "../apis/appointment/appointment";
import { createNotification } from "../apis/notification/notification";
import { getAllschedules } from "../apis/schedule/schedule";
import CustomToaster from "./CustomToaster";

export default function CreateAppointmentSchedule({
  setIsUpdated,
  setAddPopup,
  setscheduleSelecteDoctor,
  setscheduleSelectePatient,
  selectedAppointmentId,
}) {
  const [errors, setErrors] = useState();
  const [doctors, setDoctors] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formDataForAssistant, setFormDataForAssistant] = useState({
    schedule_date: "",
    start_time: "",
    end_time: "",
  });

  const onChangeFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "schedule_date") {
      setFormDataForAssistant((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        start_time: doctorSchedules.find((sche) => sche?.date === value)
          ?.start_time,
        end_time: doctorSchedules.find((sche) => sche?.date === value)
          ?.end_time,
      }));
    } else {
      setFormDataForAssistant((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const [dataLoading, setDataLoading] = useState(true);
  // GET SCHEDULE FREE SLOTS
  useEffect(() => {
    if (setscheduleSelecteDoctor !== "") {
      setDataLoading(true);
      getAllschedules(setscheduleSelecteDoctor)
        .then((res) => {
          if (Object.keys(res?.data).length > 0) {
            setDoctorSchedules(res?.data?.free_slots);
            setDataLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setDataLoading(false);
        });
    }
  }, [setscheduleSelecteDoctor]);

  //   VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // VALIDATE SCHEDULE
    if (
      !formDataForAssistant.schedule_date ||
      formDataForAssistant.schedule_date.trim() === ""
    ) {
      newErrors.schedule_date = "Schedule date is required";
    }
    // VALIDATE STARTINF TIME
    if (
      !formDataForAssistant.start_time ||
      formDataForAssistant.start_time.trim() === ""
    ) {
      newErrors.start_time = "Starting time is required";
    }
    // VALIDATE END TIME
    if (
      !formDataForAssistant.end_time ||
      formDataForAssistant.end_time.trim() === ""
    ) {
      newErrors.end_time = "End time is required";
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      updateAppointment(selectedAppointmentId, formDataForAssistant)
        .then((res) => {
          if (res) {
            approveAppointment(selectedAppointmentId)
              .then((res) => {
                if (res) {
                  setIsUpdated(Math.random());
                  createNotification({
                    reciver_id: setscheduleSelecteDoctor,
                    title: "New Appointment!",
                    message:
                      "A new appointment is approved by the assistant please check on the appointment page",
                  })
                    .then((res) => {
                      createNotification({
                        reciver_id: setscheduleSelectePatient,
                        title: "Your appointment is approved",
                        message:
                          "Your appointment is approved by the assistant please check on the appointment page",
                      })
                        .then((res) => {
                          setAddPopup(false);
                          setIsUpdated(Math.random());
                          setIsLoading(false);
                          Swal.fire(
                            "Approved!",
                            `The appointment has been approved.`,
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
                console.log(error);

                if (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Something went wrong!`,
                  });
                }
              });
          }
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
    }
  };

  useEffect(() => {
    console.log(formDataForAssistant);
  }, [formDataForAssistant]);

  return (
    <div className="w-full h-1/2 bg-base-100">
      <h1 className="text-xl font-semibold text-center my-5">
        Approve Appointment
      </h1>
      <div className="w-full h-full flex flex-col justify-between">
        {dataLoading ? (
          <div className="w-full flex justify-center items-center">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : (
          <>
            <label htmlFor="schedule_date" className="flex flex-col">
              <div>
                Schedule Date <span className="text-red-600">*</span>
              </div>
              <select
                onChange={onChangeFormData}
                className="bg-gray-100 w-full border-2 border-gary-300 outline-none rounded-md px-2 py-1 mt-1"
                type="text"
                name="schedule_date"
                id="schedule_date"
                defaultValue={formDataForAssistant?.schedule_date}
              >
                <option value={""}>Select Schedule</option>
                {doctorSchedules.map((sche, i) => (
                  <option key={i} value={sche?.date}>
                    {sche?.date}
                  </option>
                ))}
              </select>
              {errors?.schedule_date && (
                <span className="text-xs text-red-600">
                  {errors?.schedule_date}
                </span>
              )}
            </label>
            <div>
              {formDataForAssistant?.start_time &&
              formDataForAssistant?.end_time ? (
                <>
                  <div className="flex flex-col">
                    <span>
                      <span className="text-primary font-semibold">
                        Starting time:
                      </span>{" "}
                      {formDataForAssistant?.start_time}
                    </span>
                    <span>
                      <span className="text-error font-semibold">
                        End time:
                      </span>{" "}
                      {formDataForAssistant?.end_time}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}

        <div className={`flex justify-center items-center mt-10 gap-5`}>
          <button
            onClick={() => setAddPopup(false)}
            className={`transition-all duration-150 hover:scale-90 border-2 px-5 w-32 py-1 text-base-100 rounded-full border-error bg-error shadow-md shadow-error`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`transition-all duration-150 text-white hover:scale-90 border-2 px-5 w-32 py-1 rounded-full border-primary bg-primary shadow-md shadow-primary`}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
