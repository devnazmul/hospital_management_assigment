import React from 'react';

export default function DoctorCard({ key, data }) {
  console.log(data);
  return (
    <div
      key={key}
      className="cursor-pointer hover:scale-95 transition-all duration-150 w-full sm:w-[250px] shadow-lg rounded-2xl py-5 mx-2 flex flex-col justify-center items-center">
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
    </div>
  );
}
