// ===========================================
// #00122
// ===========================================

import React from 'react';
import { AiOutlineCarryOut, AiOutlineCloseCircle } from 'react-icons/ai';
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
  handleAccept,
  handleReject,
  editBtn,
  viewBtn,
  acceptBtn,
  rejectBtn,
  deleteBtn,
}) {
  return (
    <div className="overflow-x-auto w-full scrollbarVer">
      <div className="shadow-xl">
        <table className="table w-full shadow-lg">
          <thead className="bg-primary text-white">
            <tr className="">
              <th className="1/12"></th>
              {cols.map((th, i) => (
                <th key={i}>{th.toUpperCase()}</th>
              ))}
              <th className="text-center">OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              rows.length > 0 ? (
                rows.map((data, i) => (
                  <tr
                    className="cursor-pointer group bg-base-200 hover:bg-primary hover:bg-opacity-20 duration-150 text-black group tableRowAdmin hover:overflow-hidden border-b border-gray-300"
                    key={i}>
                    <th className="group-hover:bg-primary group-hover:bg-opacity-0 duration-150 bg-base-200  w-[70px]  px-8">
                      {i + 1}
                    </th>

                    {cols.map((col, j) => (
                      <td className="bg-transparent h-full" key={j}>
                        {data[col]}
                      </td>
                    ))}

                    <td className="bg-transparent h-full w-full flex justify-center items-center">
                      <>
                        {data?.rawStatus !== 'approved' && data?.rawStatus !== 'rejected' && acceptBtn && (
                          <button
                            onClick={() =>
                              handleAccept(
                                data?.id,
                                data?.patient_id,
                                data?.doctor_id
                              )
                            }
                            title="details"
                            className="bg-success p-2 rounded-full hover:btn-secondary-focus hover:bg-opacity-90">
                            <AiOutlineCarryOut className="text-lg text-base-100" />
                          </button>
                        )}
                        {data?.rawStatus !== 'rejected' && rejectBtn && (
                          <button
                            onClick={() =>
                              handleReject(data?.id, data?.patient_id)
                            }
                            title="edit"
                            className="bg-error p-2 rounded-full hover:btn-primary-focus hover:bg-opacity-90 ml-2">
                            <AiOutlineCloseCircle className="text-lg text-base-100" />
                          </button>
                        )}
                        {editBtn && (
                          <button
                            onClick={() => handleEdit(data?.id)}
                            title="edit"
                            className="bg-success p-2 rounded-full hover:btn-primary-focus hover:bg-opacity-90 ml-2">
                            <FiEdit className="text-lg text-base-100" />
                          </button>
                        )}

                        {deleteBtn && (
                          <button
                            onClick={() => handleDelete(data?.id)}
                            title="delete"
                            className="bg-red-600 p-2 rounded-full hover:bg-opacity-80 ml-2">
                            <MdDelete className="text-lg text-base-100" />
                          </button>
                        )}
                      </>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-center py-5 bg-base-100 border-b border-gray-500"
                    colSpan={cols?.length + 2}>
                    <div className="flex justify-center items-center flex-col">
                      <h1>
                        <BiError className="text-error text-4xl" />
                      </h1>
                      <p className="text-error">No Data Found!</p>
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
    </div>
  );
}
