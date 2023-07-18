// ===========================================
// #00122
// ===========================================

import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

export default function Table({
  rows,
  cols,
  isLoading,
  handleView,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="overflow-x-auto w-full scrollbarVer">
      <table className="table w-full">
        <thead className="bg-primary text-black">
          <tr className="">
            <th className="1/12"></th>
            {cols.map((th, i) => (
              <th key={i}>{th.toUpperCase()}</th>
            ))}
            <th  className="text-center">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            rows.length > 0 ? (
              rows.map((data, i) => (
                <tr
                  className="bg-primary hover:bg-base-100 text-base-100 hover:text-primary group tableRowAdmin hover:overflow-hidden"
                  key={i}>
                  <th className="bg-primary group-hover:bg-base-100  w-[70px]  px-8">
                    {i + 1}
                  </th>

                  {cols.map((col, j) => (
                    <td className="bg-transparent h-full" key={j}>
                      {data[col]}
                    </td>
                  ))}

                  <td className="bg-transparent h-full w-full flex justify-center items-center">
                    <button
                      onClick={() => handleView(data?.id)}
                      title="details"
                      className="bg-info p-2 rounded-full hover:btn-secondary-focus hover:bg-opacity-90">
                      <AiOutlineEye className="text-lg text-primary" />
                    </button>
                    <button
                      onClick={() => handleEdit(data?.id)}
                      title="edit"
                      className="bg-success p-2 rounded-full hover:btn-primary-focus hover:bg-opacity-90 ml-2">
                      <FiEdit className="text-lg text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(data?.id)}
                      title="delete"
                      className="bg-error p-2 rounded-full hover:bg-opacity-90 ml-2">
                      <MdDelete className="text-lg text-primary" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-5 bg-primary" colSpan={cols?.length + 2}>
                  <div className="flex justify-center items-center flex-col">
                    <h1>
                      <BiError className="text-error text-4xl" />
                    </h1>
                    <p className='text-error'>No Data Found!</p>
                  </div>
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td className="text-center py-5" colSpan={cols?.length + 2}>
                <div
                  className="radial-progress animate-spin"
                  style={{
                    '--value': '70',
                    '--size': '3rem',
                    '--thickness': '5px',
                  }}></div>
              </td>
            </tr>
          )}
        </tbody>
        
      </table>
    </div>
  );
}
