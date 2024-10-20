import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { createAppointment } from "../apis/appointment/appointment";
import { getUserByRole } from "../apis/auth/auth";
import { createNotification } from "../apis/notification/notification";
import { getAllSchedules, updateSchedule } from "../apis/schedule/schedule";
import CustomToaster from "./CustomToaster";
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";
import moment from "moment";
import { GoPlusCircle, GoXCircle } from "react-icons/go";

export default function CreateSchedule({ setIsUpdated, setAddPopup, data }) {
  const user = JSON.parse(localStorage.getItem("userData"));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor_id: user?.id,
    free_slots:
      data?.length > 0
        ? data
        : [
            {
              id: "1",
              date: "",
              start_time: "",
              end_time: "",
            },
          ],
  });

  // NEED TO HANDLE CHANGES OF FREE SLOT SCHEDULES ACCORDING TO THE INDEX
  const onChangeFormData = ({ e, index }) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      free_slots: prevFormData?.free_slots?.map((slot, i) => {
        // IF INDEX MATCH
        if (slot?.id === index) {
          // IF DATE
          if (name === "date") {
            if (prevFormData?.free_slots?.some((s) => s?.date === value)) {
              toast.custom((t) => (
                <CustomToaster
                  t={t}
                  type={"error"}
                  text={`ID: #00109 - Date already exists`}
                />
              ));
              return slot;
            } else {
              return {
                ...slot,
                [name]: value,
              };
            }
          }

          // IF TIME
          if (name === "start_time" || name === "end_time") {
            if (name === "start_time") {
              // CHECK START TIME IS GREATER THAN END TIME
              if (
                moment(slot?.end_time, "HH:mm").isBefore(moment(value, "HH:mm"))
              ) {
                toast.custom((t) => (
                  <CustomToaster
                    t={t}
                    type={"error"}
                    text={`ID: #00109 - Start time must be less than end time`}
                  />
                ));
                return slot;
              } else {
                return {
                  ...slot,
                  [name]: value,
                };
              }
            }

            if (name === "end_time") {
              // CHECK END TIME IS LESS THEN START TIME
              if (
                moment(slot?.start_time, "HH:mm").isAfter(
                  moment(value, "HH:mm")
                )
              ) {
                toast.custom((t) => (
                  <CustomToaster
                    t={t}
                    type={"error"}
                    text={`ID: #00109 - End time must be greater than start time`}
                  />
                ));
                return slot;
              } else {
                return {
                  ...slot,
                  [name]: value,
                };
              }
            }
          }
        } else {
          return slot;
        }
      }),
    }));
  };

  // NEED TO VALIDATE DATE AND TIME. IF THERE IS A SLOT THEN MUST  FIELD NEED TO FILL DATE AND TIME. IF DATE IS SELECTED AND TIME IS NOT SELECTED THEN SHOW ERROR. IF DATE AND TIME IS SELECTED BUT END TIME IS LESS THEN START TIME SHOW ERROR.
  const [errors, setErrors] = useState([]);
  const validateForm = () => {
    let newErrors = [];
    if (
      formData?.free_slots?.some(
        (s) =>
          s?.date === "" ||
          s?.start_time === "" ||
          s?.end_time === "" ||
          s?.end_time < s?.start_time
      )
    ) {
      const errorFields = formData.free_slots?.filter(
        (s) =>
          s?.date === "" ||
          s?.start_time === "" ||
          s?.end_time === "" ||
          s?.end_time < s?.start_time
      );
      errorFields?.forEach((errorField) => {
        newErrors = [
          ...newErrors,
          {
            id: errorField?.id,
            message: "Date, start time and end time all are required",
          },
        ];
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      // Form is valid, submit the data
      // You can perform your submit logic here
      updateSchedule({
        doctor_id: user?.id,
        free_slots: formData?.free_slots?.map((s) => {
          return {
            ...s,
            date: moment(s?.date, "YYYY-MM-DD").format("DD-MM-YYYY"),
          };
        }),
      })
        .then((res) => {
          toast.success("Schedule Updated Successfully");
          setIsLoading(false);
          setAddPopup(false);
          setIsUpdated(Math.random());
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
    <div className="w-full h-[calc(100%-50px)] px-5  relative">
      <h1 className="text-xl font-semibold text-center my-5">
        Change Schedule
      </h1>

      <div className="h-[calc(100%-5rem)] w-full flex flex-col bg-base-100 gap-5 ">
        <div
          className={`h-full flex flex-col gap-5 overflow-y-auto overflow-x-hidden py-5`}
        >
          {formData?.free_slots?.map((slot, i) => (
            <div className={`bg-gray-100 p-2 border rounded-lg`} key={i}>
              <div
                className={`grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-5 `}
              >
                <div className={` w-full `}>
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={
                      formData?.free_slots.find((s) => s?.id === slot?.id)?.date
                    }
                    onChange={(e) => {
                      console.log({ e: e.target.name });
                      onChangeFormData({ e: e, index: slot?.id });
                    }}
                    className="bg-white input border p-3 rounded-md w-full  text-[#000]"
                  />
                </div>

                <div className={` w-full `}>
                  <label className="label">
                    <span className="label-text">Start Time</span>
                  </label>

                  <input
                    type="time"
                    name="start_time"
                    value={
                      formData?.free_slots.find((s) => s?.id === slot?.id)
                        ?.start_time
                    }
                    onChange={(e) =>
                      onChangeFormData({ e: e, index: slot?.id })
                    }
                    className="input input-bordered w-full"
                  />
                </div>

                <div className={` w-full `}>
                  <label className="label">
                    <span className="label-text">End Time</span>
                  </label>

                  <input
                    type="time"
                    name="end_time"
                    value={
                      formData?.free_slots.find((s) => s?.id === slot?.id)
                        ?.end_time
                    }
                    onChange={(e) =>
                      onChangeFormData({ e: e, index: slot?.id })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <span className={`text-red-500 text-xs  md:hidden block`}>
                  {errors?.find((error) => error?.id === slot?.id)?.message}
                </span>
                <div
                  className={`flex flex-col md:flex-row  items-end gap-2 w-full `}
                >
                  {/* WHEN CLICK ON THIS BUTTON NEW SLOT WILL BE ADDED  */}
                  <button
                    onClick={() => {
                      // NEED TO CREATE ID LIKE MONGODIB USING CURRENT TIME
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        free_slots: [
                          ...prevFormData.free_slots,
                          {
                            id: Date.now(),
                            date: "",
                            start_time: "",
                            end_time: "",
                          },
                        ],
                      }));
                    }}
                    className={`btn p-1 btn-primary w-full md:w-[40%] flex items-center justify-center`}
                  >
                    <GoPlusCircle
                      className={`text-lg md:text-3xl text-base-300`}
                    />{" "}
                    <span className={`text-white block md:hidden`}>
                      Add New
                    </span>
                  </button>

                  {/* WHEN THERE IS MORE THEN 1 SLOT SHOW THE BUTTON AND WHEN CLICK ON THIS BUTTON NEW SLOT WILL BE REMOVED  */}
                  {formData?.free_slots?.length > 1 && (
                    <button
                      onClick={() => {
                        // remove this id slot
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          free_slots: [
                            ...prevFormData.free_slots.filter(
                              (s) => s.id !== slot.id
                            ),
                          ],
                        }));
                      }}
                      className={`btn p-1 btn-error w-full md:w-[40%] flex items-center justify-center`}
                    >
                      <GoXCircle
                        className={`text-lg md:text-3xl text-base-300`}
                      />{" "}
                      <span className={`text-white block md:hidden`}>
                        Remove
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <span className={`text-red-500 text-xs hidden md:block`}>
                {errors?.find((error) => error?.id === slot?.id)?.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`flex justify-end items-center  w-full mb-10 gap-5 absolute -bottom-16 left-1/2 -translate-x-1/2`}
      >
        <button
          onClick={handleSubmit}
          className={`transition-all mr-10 duration-150 text-white hover:scale-90 border-2 px-5 w-32 py-1 rounded-full border-primary bg-primary shadow-md shadow-primary`}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
