import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { createAppointment } from "../apis/appointment/appointment";
import { getUserByRole } from "../apis/auth/auth";
import { createNotification } from "../apis/notification/notification";
import { getAllSchedules } from "../apis/schedule/schedule";
import CustomToaster from "./CustomToaster";
import moment from "moment";

export default function CreateAppointment({ setIsUpdated, setAddPopup }) {
  const [errors, setErrors] = useState();
  const [doctors, setDoctors] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formDataForAssistant, setFormDataForAssistant] = useState({
    name: "",
    email: "",
    password: "",
    doctor_id: "",
    schedule_date: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    console.log({ formDataForAssistant });
  }, [formDataForAssistant]);
  useEffect(() => {
    if (!formDataForAssistant?.doctor_id) {
      setFormDataForAssistant((prevFormData) => ({
        ...prevFormData,
        start_time: "",
        end_time: "",
      }));
    }
  }, [formDataForAssistant?.doctor_id]);
  useEffect(() => {
    if (formDataForAssistant?.schedule_date) {
      setFormDataForAssistant((prevFormData) => ({
        ...prevFormData,
        start_time: doctors
          ?.find((doctor) => doctor?._id === formDataForAssistant?.doctor_id)
          ?.schedule?.free_slots?.find(
            (slot) => slot?.date === formDataForAssistant?.schedule_date
          )?.start_time,
        end_time: doctors
          ?.find((doctor) => doctor?._id === formDataForAssistant?.doctor_id)
          ?.schedule?.free_slots?.find(
            (slot) => slot?.date === formDataForAssistant?.schedule_date
          )?.end_time,
      }));
    }
  }, [formDataForAssistant?.schedule_date]);

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

  //   GET ALL DOCTORS
  useEffect(() => {
    getUserByRole("doctor").then((res) => {
      setDoctors(res?.data);
    });
  }, []);

  // GET TIME

  //   VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formDataForAssistant.name || formDataForAssistant.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (
      !formDataForAssistant.email ||
      formDataForAssistant.email.trim() === ""
    ) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formDataForAssistant.email.trim()
      )
    ) {
      newErrors.email = "Invalid email";
    }

    // VALIDATE DOCTOR
    if (
      !formDataForAssistant.doctor_id ||
      formDataForAssistant.doctor_id.trim() === ""
    ) {
      newErrors.doctor_id = "Doctor is required";
    }

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
    console.log({ newErrors });
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      createAppointment(formDataForAssistant)
        .then((res) => {
          if (res) {
            setAddPopup(false);
            setIsLoading(false);
            setIsUpdated(Math.random());
            createNotification({
              reciver_id: formDataForAssistant?.doctor_id,
              title: "New Appointment!",
              message:
                "A new appointment is approved by the assistant please check on the appointment page",
            })
              .then((res) => {
                Swal.fire(
                  "Created!",
                  `The appointment has been approved.`,
                  "success"
                );
              })
              .catch((error) => {
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

  return (
    <div className="w-full bg-base-100 px-5">
      <h1 className="text-xl font-semibold text-center my-5">
        Create Appointment
      </h1>
      <div className="h-full w-full flex flex-col bg-base-100 gap-5">
        <label htmlFor="name" className="flex flex-col">
          <div>
            Patient Name <span className="text-red-600">*</span>
          </div>
          <input
            onChange={onChangeFormData}
            className="bg-gray-100 w-full border-2 border-gary-300 outline-none rounded-md px-2 py-1 mt-1"
            type="text"
            name="name"
            id="name"
          />
          {errors?.name && (
            <span className="text-xs text-red-600">{errors?.name}</span>
          )}
        </label>
        <label htmlFor="email" className="flex flex-col">
          <div>
            Patient Email <span className="text-red-600">*</span>
          </div>
          <input
            onChange={onChangeFormData}
            className="bg-gray-100 w-full border-2 border-gary-300 outline-none rounded-md px-2 py-1 mt-1"
            type="text"
            name="email"
            id="email"
          />
          {errors?.email && (
            <span className="text-xs text-red-600">{errors?.email}</span>
          )}
        </label>
        <label htmlFor="password" className="flex flex-col">
          <div>
            Password <span className="text-red-600">*</span>
          </div>
          <input
            onChange={onChangeFormData}
            className="bg-gray-100 w-full border-2 border-gary-300 outline-none rounded-md px-2 py-1 mt-1"
            type="password"
            name="password"
            id="password"
          />
          {errors?.password && (
            <span className="text-xs text-red-600">{errors?.password}</span>
          )}
        </label>
        <label htmlFor="doctor_id" className="flex flex-col">
          <div>
            Select Doctor <span className="text-red-600">*</span>
          </div>
          <select
            onChange={onChangeFormData}
            className="bg-gray-100 w-full border-2 border-gary-300 outline-none rounded-md px-2 py-1 mt-1"
            type="text"
            name="doctor_id"
            id="doctor_id"
            defaultValue={formDataForAssistant?.doctor_id}
          >
            <option value={""}>Select Doctor</option>
            {doctors.map((doc, i) => (
              <option key={i} value={doc?._id}>
                {doc?.name}
              </option>
            ))}
          </select>
          {errors?.doctor_id && (
            <span className="text-xs text-red-600">{errors?.doctor_id}</span>
          )}
        </label>
        <label htmlFor="schedule_date" className="flex flex-col">
          <div>
            Schedule Date <span className="text-red-600">*</span>
          </div>
          <select
            disabled={!formDataForAssistant?.doctor_id}
            onChange={onChangeFormData}
            className="bg-gray-100 w-full border-2 border-gary-300 outline-none rounded-md px-2 py-1 mt-1"
            type="text"
            name="schedule_date"
            id="schedule_date"
            defaultValue={formDataForAssistant?.schedule_date}
          >
            <option value={""}>Select Schedule</option>

            {doctors
              ?.find((doc) => doc?._id === formDataForAssistant?.doctor_id)
              ?.schedule?.free_slots?.map((schedule, i) => (
                <option key={i} value={schedule?.date}>
                  {schedule?.date} (
                  {moment(schedule?.start_time, "hh:mm").format("hh:mm A")} To{" "}
                  {moment(schedule?.end_time, "hh:mm").format("hh:mm A")})
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
                    Statrting time:
                  </span>{" "}
                  {formDataForAssistant?.start_time}
                </span>
                <span>
                  <span className="text-error font-semibold">End time:</span>{" "}
                  {formDataForAssistant?.end_time}
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className={`flex justify-center items-center mb-10 gap-5`}>
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
