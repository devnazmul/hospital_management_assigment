import moment from "moment";
import React from "react";
import { convertTo12HourFormat } from "../utils/convertTo12HourFormat";
import { deleteUser } from "../apis/auth/auth";
import toast from "react-hot-toast";
import CustomToaster from "./CustomToaster";
import { MdDelete } from "react-icons/md";

function getSchedules(scheduleArray) {
  const currentDate = moment().startOf("day"); // Get current date, ignoring time part

  let todaySchedule = {};
  const upcomingSchedules = [];

  if (scheduleArray?.length > 0) {
    scheduleArray?.forEach((schedule) => {
      const scheduleDate = moment(schedule.date, "DD-MM-YYYY");

      // Check if the schedule is for today
      if (scheduleDate.isSame(currentDate, "day")) {
        todaySchedule = schedule; // Assign today's schedule
      }
      // Check if the schedule is in the future
      else if (scheduleDate.isAfter(currentDate)) {
        upcomingSchedules.push(schedule); // Add to upcoming schedules
      }
    });

    // Sort the upcoming schedules by date and time
    const sortedUpcomingSchedules = upcomingSchedules?.sort((a, b) => {
      const dateA = moment(`${a.date} ${a.start_time}`, "DD-MM-YYYY HH:mm:ss");
      const dateB = moment(`${b.date} ${b.start_time}`, "DD-MM-YYYY HH:mm:ss");
      return dateA - dateB;
    });

    return {
      todaySchedule: Object.keys(todaySchedule).length ? todaySchedule : {}, // Empty object if no schedule for today
      upcomingSchedules: sortedUpcomingSchedules?.length
        ? sortedUpcomingSchedules[0]
        : {},
    };
  } else {
    return {
      todaySchedule: {}, // Empty object if no schedule for today
      upcomingSchedules: {},
    };
  }
}

export default function DoctorCard({ data, setIsUpdated }) {
  const schedule = getSchedules(data?.schedule?.free_slots);

  return (
    <div className=" w-full relative transition-all border duration-150 shadow-lg rounded-2xl py-5 mx-2 flex flex-col justify-center items-center">
      <button
        className={`absolute top-5 right-5`}
        onClick={() => {
          deleteUser(data?.id)
            .then((res) => {
              setIsUpdated(Math.random());
              toast.custom((t) => (
                <CustomToaster
                  t={t}
                  type={"success"}
                  text={`Doctor has been deleted successfully!`}
                />
              ));
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
        }}
        title="Delete"
      >
        <MdDelete className={`text-red-500 text-xl`} />
      </button>
      <img
        className="w-[100px] h-[100px] rounded-full object-cover"
        src={data?.profile}
        alt=""
      />
      <h1 className="text-xl font-semibold mt-5 text-primary">{data?.name}</h1>
      <h1 className="text-sm font-semibold text-gray-400">{`${data?.role
        .charAt(0)
        .toUpperCase()}${data?.role.slice(0).toLowerCase()}`}</h1>
      <address>{data?.email}</address>

      <>
        {Object.keys(schedule?.todaySchedule)?.length > 0 ? (
          <div
            className={` flex justify-center items-center flex-col font-bold text-xs mt-2`}
          >
            <div>Todays schedule:</div>

            <div className={`text-green-500`}>
              {convertTo12HourFormat(schedule?.todaySchedule?.start_time)}{" "}
              <span className={`text-black`}>To</span>{" "}
              {convertTo12HourFormat(schedule?.todaySchedule?.end_time)}
            </div>
          </div>
        ) : (
          <>
            {Object.keys(schedule?.upcomingSchedules)?.length > 0 ? (
              <div
                className={`text-purple-500 flex justify-center items-center flex-col font-bold text-xs mt-2`}
              >
                <div>Upcoming schedule:</div>
                <div>
                  {moment(
                    schedule?.upcomingSchedules?.date,
                    "DD-MM-YYYY"
                  ).format("ll")}
                </div>
                <div>
                  {convertTo12HourFormat(
                    schedule?.upcomingSchedules?.start_time
                  )}{" "}
                  <span className={`text-black`}>to</span>{" "}
                  {convertTo12HourFormat(schedule?.upcomingSchedules?.end_time)}
                </div>
              </div>
            ) : (
              <span className={`text-red-500 font-bold text-xs mt-2`}>
                No Schedule
              </span>
            )}
          </>
        )}
      </>
    </div>
  );
}
