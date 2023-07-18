// =================================
// #00167
// =================================
import React from 'react'

export default function CustomPerPageSelector({setPerPage}) {
  return (
    <div className="py-2 px-2 flex w-full flex-col justify-start items-start gap-2 mt-5 ">
          {/* <label htmlFor="perPage">per page:</label> */}
          <select
            id="perPage"
            name="perPage"
            className="select input-sm w-40 border-neutral bg-primary text-base-100"
            onChange={(e) => setPerPage(e.target.value)}
            defaultValue={10}>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
  )
}
