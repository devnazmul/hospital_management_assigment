// ===========================================
// #00129
// ===========================================

import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { playAlartSound } from '../utils/playAlart';

export default function CustomToaster({ t, type, text }) {
  
  useEffect(() => {
    playAlartSound();
  }, []);

  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-base-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            {type === 'error' && (
              <p className="text-sm font-medium text-red-600">Oh! No 🤯</p>
            )}
            {type === 'success' && (
              <p className="text-sm font-medium text-green-600">Done 😊</p>
            )}
            {type === 'info' && (
              <p className="text-sm font-medium text-indigo-600">Tips</p>
            )}
            <p className="mt-1 text-sm text-gray-900">{text}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className={`w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium ${
            type === 'error' && 'text-red-600 hover:text-red-500'
          } ${type === 'success' && 'text-green-600 hover:text-green-500'} ${
            type === 'info' && 'text-indigo-600 hover:text-indigo-500'
          } focus:outline-none`}>
          Close
        </button>
      </div>
    </div>
  );
}
