// ===========================================
// #00137
// ===========================================
import React from 'react';

export default function CustomLoading() {
  return (
    <div className="h-[75vh] w-full flex justify-center items-center bg-base-100">
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  );
}
