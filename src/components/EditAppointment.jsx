import React, { useEffect, useState } from "react";
import { createAppointment } from "../apis/appointment/appointment";
import { getUserByRole } from "../apis/auth/auth";
import { getAllSchedules } from "../apis/schedule/schedule";

export default function CreateAppointment({ setIsUpdated, setAddPopup }) {
  const [errors, setErrors] = useState();
  const [doctors, setDoctors] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [formDataForAssistant, setFormDataForAssistant] = useState({
    name: "",
    email: "",
    doctor_id: "",
    schedule_date: "",
  });

  const onChangeFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormDataForAssistant((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //   GET ALL DOCTORS
  useEffect(() => {
    getUserByRole("doctor").then((res) => {
      console.log(res);
      setDoctors(res?.data);
    });
  }, []);

  // GET SCHEDULE FREE SLOTS
  useEffect(() => {
    if (formDataForAssistant?.doctor_id !== "") {
      getAllSchedules(formDataForAssistant?.doctor_id)
        .then((res) => {
          if (Object.keys(res?.data).length > 0) {
            setDoctorSchedules(res?.data?.free_slots);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formDataForAssistant]);

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

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      createAppointment(formDataForAssistant).then((res) => {
        if (res) {
          setAddPopup(false);
          setIsUpdated(Math.random());
        }
      });
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold text-center my-5">
        Create Appointment
      </h1>
      <div className="h-full w-full flex flex-col gap-5">
        <label htmlFor="name" className="flex flex-col">
          <div>
            Patient Name <span className="text-red-600">*</span>
          </div>
          <input
            onChange={onChangeFormData}
            className="bg-transparent w-full border border-primary outline-none rounded-md px-2 py-1"
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
            className="bg-transparent w-full border border-primary outline-none rounded-md px-2 py-1"
            type="text"
            name="email"
            id="email"
          />
          {errors?.email && (
            <span className="text-xs text-red-600">{errors?.email}</span>
          )}
        </label>
        <label htmlFor="doctor_id" className="flex flex-col">
          <div>
            Select Doctor <span className="text-red-600">*</span>
          </div>
          <select
            onChange={onChangeFormData}
            className="bg-transparent w-full border border-primary outline-none rounded-md px-2 py-1"
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
            onChange={onChangeFormData}
            className="bg-transparent w-full border border-primary outline-none rounded-md px-2 py-1"
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

        <div
          className={`flex justify-center md:justify-end items-center gap-5 mt-10`}
        >
          <button
            className={`transition-all duration-150 hover:scale-90 border-2 px-5 w-32 py-1 rounded-full border-base-100 bg-primary shadow-md`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`transition-all duration-150 text-white hover:scale-90 border-2 px-5 w-32 py-1 rounded-full border-secondary bg-secondary shadow-md shadow-secondary`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
