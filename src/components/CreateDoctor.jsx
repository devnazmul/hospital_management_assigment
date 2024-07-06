import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { registration } from "../apis/auth/auth";
import CustomToaster from "./CustomToaster";
import { createSchedule } from "../apis/schedule/schedule";
import moment from "moment";

export default function CreateDoctor({ setIsOpenPopup, id }) {
  const [dataLoading, setDataLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });
  const [scheduleData, setScheduleData] = useState([
    {
      date: "",
      start_time: "",
      end_time: "",
    },
  ]);
  useEffect(() => {
    if (id) {
      setDataLoading(true);
    }
  }, [id]);

  const onChangeFormData = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      setFormData((prev) => ({
        ...prev,
        [name]: moment(value, "YYYY-MM-DD").format("DD-MM-YYYY"),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Invalid email";
    }

    // Validate Name
    if (!formData.password || formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    if (validateForm()) {
      registration(formData)
        .then((res) => {
          createSchedule({
            doctor_id: res?.id,
            free_slots: scheduleData,
          });
          Swal.fire("Created!", `The doctor has been approved.`, "success");
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
  };
  return (
    <div className="w-full h-1/2 bg-base-100">
      <h1 className="text-xl font-semibold text-center my-5">Add Doctor</h1>
      <div className="w-full h-full flex flex-col justify-between">
        {dataLoading ? (
          <div className="w-full flex justify-center items-center">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : (
          <div className={`flex flex-col`}>
            <label htmlFor="name" className="flex flex-col">
              <div>
                Doctor Name <span className="text-red-600">*</span>
              </div>
              <input
                value={formData.name}
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
                Doctor Email <span className="text-red-600">*</span>
              </div>
              <input
                value={formData.email}
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
          </div>
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
              "Add"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
