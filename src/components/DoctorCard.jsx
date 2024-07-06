import moment from "moment";
import React from "react";
import { convertTo12HourFormat } from "../utils/convertTo12HourFormat";

export default function DoctorCard({ key, data }) {
  return (
    <div
      key={key}
      className=" w-full relative transition-all border duration-150 shadow-lg rounded-2xl py-5 mx-2 flex flex-col justify-center items-center"
    >
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
        {Object.keys(data?.schedule)?.length > 0 ? (
          <div
            className={`text-green-500 flex justify-center items-center flex-col font-bold text-xs mt-2`}
          >
            <div>Upcoming schedule:</div>
            <div>
              {moment(data?.schedule?.free_slots[0]?.date, "DD-MM-YYYY").format(
                "ll"
              )}
            </div>
            <div>
              From:{" "}
              {convertTo12HourFormat(data?.schedule?.free_slots[0]?.start_time)}{" "}
              | To:{" "}
              {convertTo12HourFormat(data?.schedule?.free_slots[0]?.end_time)}
            </div>
          </div>
        ) : (
          <span className={`text-red-500 font-bold text-xs mt-2`}>
            No Schedule
          </span>
        )}
      </>
    </div>
  );
}
