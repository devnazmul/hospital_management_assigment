// ===========================================
// #00133
// ===========================================

import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CiSquareRemove } from 'react-icons/ci';
const CustomSelect = ({
  icon = false,
  isMulti = false,
  isAddNewItemActive = false,
  isExpandForm=false,
  handleAddNewItemActive,
  options,
  setOptions,
  selectedOptions,
  setSelectedOptions,
  searchTerm,
  setSearchTerm,
  placeholder,
  className,
}) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleOptionClick = (option) => {
    if (isMulti) {
      if (selectedOptions.includes(option)) {
        setSearchTerm('');
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSearchTerm('');
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      setSearchTerm('');
    }
  };

  const filteredOptions = options.filter(
    (option) =>
      option.label &&
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef(null);
  const dropdownRef = useRef(null);
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      const width = elementRef.current.offsetWidth;
      setPadding(width + 2);
    }
  }, [options, isFocused, searchTerm, selectedOptions]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsFocused(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`${className ? className : 'w-full'} relative`}>
      <div className="w-full">
        <input
          disabled={!isMulti && selectedOptions.length > 0}
          onFocus={() => setIsFocused(true)}
          type="text"
          style={{
            paddingLeft: padding,
          }}
          className={`placeholder:text-base-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
          placeholder={
            !isMulti && selectedOptions.length > 0 ? '' : placeholder
          }
          value={searchTerm}
          onChange={handleSearch}
        />
        <div
          ref={elementRef}
          className="absolute top-1/2 -translate-y-1/2 px-2 flex gap-1 ">
          {selectedOptions.map((option) => (
            <div
              key={option.id}
              className="bg-base-100 border border-primary text-primary text-xs px-1 py-0.5 rounded-md flex items-center gap-1">
              {option.label}
              <CiSquareRemove
                onClick={() =>
                  setSelectedOptions(
                    selectedOptions.filter((so) => so?.id !== option?.id)
                  )
                }
                className={`cursor-pointer text-primary hover:text-error`}
              />
            </div>
          ))}
        </div>
      </div>

      <ul
        className={`${
          isFocused ? 'block' : 'hidden'
        } absolute w-full bg-primary mt-2 border border-gray-300 rounded-md scrollbar overflow-y-auto max-h-40 z-50`}>
        {!isExpandForm && filteredOptions.map((option) => (
          <li
            key={option.id}
            className={`px-4 hover:bg-info hover:bg-opacity-50 py-2 cursor-pointer border-b text-left ${
              selectedOptions.includes(option)
                ? 'bg-base-100 text-primary font-medium'
                : 'text-neutral'
            }`}
            onClick={() => {
              handleOptionClick(option);
              setIsFocused(false);
              setSearchTerm('');
            }}>
            {option.label}
          </li>
        ))}
        {!isExpandForm && isAddNewItemActive && (
          <li className='w-full text-center flex justify-center items-center hover:bg-blue-100'>
            <button className='w-full py-1 flex gap-2 justify-center items-center font-semibold' onClick={handleAddNewItemActive}><AiOutlinePlusCircle className='text-xl' /> Add new</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CustomSelect;
