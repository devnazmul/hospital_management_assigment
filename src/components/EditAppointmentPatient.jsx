import React, { useEffect, useState } from 'react';
import { createAppointment } from '../apis/appointment/appointment';
import { getUserByRole } from '../apis/auth/auth';
import { getAllschedules } from '../apis/schedule/schedule';

export default function CreateAppointmentPatient({
  setIsUpdated,
  setAddPopup,
}) {
  const [errors, setErrors] = useState();
  const [doctors, setDoctors] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [formDataForAssistant, setFormDataForAssistant] = useState({
    doctor_id: '',
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
    getUserByRole('doctor').then((res) => {
      console.log(res);
      setDoctors(res?.data);
    });
  }, []);

  // GET SCHEDULE FREE SLOTS
  useEffect(() => {
    if (formDataForAssistant?.doctor_id !== '') {
      getAllschedules(formDataForAssistant?.doctor_id)
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
      formDataForAssistant.doctor_id.trim() === ''
    ) {
      newErrors.doctor_id = 'Doctor is required';
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      createAppointment(formDataForAssistant).then((res) => {
        if (res) {
          setAddPopup(false)
          setIsUpdated(Math.random());

        }
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
            defaultValue={formDataForAssistant?.doctor_id}>
            <option value={''}>Select Doctor</option>
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

        <div
          className={`flex bg-base-100 w-[100%] justify-center items-center gap-5`}>
          <button className={`btn btn-error`}>Cancel</button>
          <button onClick={handleSubmit} className={`btn btn-primary`}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
