import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createAppointment } from "../apis/appointment/appointment";
import { getUserByRole } from "../apis/auth/auth";
import { getAllSchedules } from "../apis/schedule/schedule";
import CustomToaster from "./CustomToaster";

export default function CreateAppointmentPatient({
  setIsUpdated,
  setAddPopup,
}) {
  const [errors, setErrors] = useState();
  const [doctors, setDoctors] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formDataForAssistant, setFormDataForAssistant] = useState({
    doctor_id: "",
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

    // VALIDATE DOCTOR
    if (
      !formDataForAssistant.doctor_id ||
      formDataForAssistant.doctor_id.trim() === ""
    ) {
      newErrors.doctor_id = "Doctor is required";
    }

    setErrors(newErrors);
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
            setIsUpdated(Math.random());
            setIsLoading(false);
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
    <div className="w-full h-1/2 bg-base-100">
      <h1 className="text-xl font-semibold text-center my-5">
        Create Appointment
      </h1>
      <div className="w-full h-full flex flex-col justify-between">
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
