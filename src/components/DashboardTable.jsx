// ===========================================
// #00108
// ===========================================

import React from 'react';
import { BiDownArrow, BiError } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export default function DashboardTable({
  rows,
  cols,
  isLoading,
  handleView,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className=" w-full scrollbarVer">
      <table className="table w-full">
        <thead className="bg-primary text-black">
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
                  className="cursor-pointer bg-primary hover:bg-base-100 text-base-100 hover:text-primary group tableRowAdmin hover:overflow-hidden text-md"
                  key={i}>
                  <th className="bg-primary font-light group-hover:bg-base-100 w-[70px] px-8">
                    {i + 1}
                  </th>

                  {cols.map((col, j) => (
                    <td className="bg-transparent h-full" key={j}>
                      {col==='status'?
                      <span className={`py-2 w-20 text-center block font-semibold rounded-lg ${data[col]==="partial"&&"bg-blue-300 text-blue-700"} ${data[col]==="draft"&&"bg-gray-300 text-gray-700"} ${data[col]==="unsent"&&"bg-yellow-300 text-yellow-700"} ${data[col]==="paid"&&"bg-green-300 text-green-700"}`}>
                        {data[col]}
                      </span>
                      :
                      <>
                      {data[col]}
                      </>
                      }
                    </td>
                  ))}

                  <td className="bg-transparent h-full w-full flex justify-center items-center">
                    <details className="dropdown dropdown-end">
                      <summary className="w-8 h-8 border flex justify-center items-center rounded-full hover:bg-primary hover:text-base-100"><BiDownArrow className='text-lg'/></summary>
                      <ul className="p-2 shadow menu dropdown-content bg-primary z-[1] text-base-100 rounded-box w-52">
                        <li className='hover:bg-base-100 rounded-md hover:text-secondary opacity-100'>
                          <NavLink to={`/invoice/send-options/${data?.id}`} className=''>View</NavLink>
                        </li>
                        <li className='hover:bg-base-100 rounded-md hover:text-secondary opacity-100'>
                          <NavLink to={`/invoice-form/edit/${data?.id}`}>Edit</NavLink>
                        </li>
                        <hr />
                        <li className='hover:bg-base-100 rounded-md hover:text-secondary opacity-100'>
                          <a>Record Payment</a>
                        </li>
                        <li className='hover:bg-base-100 rounded-md hover:text-secondary opacity-100'>
                          <a>Share</a>
                        </li>
                        <hr />
                        <li className='hover:bg-base-100 rounded-md hover:text-secondary opacity-100'>
                          <a>Export as PDF</a>
                        </li>
                        <li className='hover:bg-base-100 rounded-md hover:text-secondary opacity-100'>
                          <a>Print</a>
                        </li>
                        <li className='hover:bg-error rounded-md text-error opacity-100'>
                          <button onClick={()=>handleDelete(data?.id)} className=''>Delete</button>
                        </li>
                      </ul>
                    </details>
                    {/* <button
                      onClick={() => handleView(data?.id)}
                      title="details"
                      className="bg-info p-2 rounded-full hover:btn-secondary-focus hover:bg-opacity-90">
                      <AiOutlineEye className="text-lg text-primary" />
                    </button> */}
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
