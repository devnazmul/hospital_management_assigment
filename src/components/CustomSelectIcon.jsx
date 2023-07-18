// ===========================================
// #00133
// ===========================================

import React, { useEffect, useRef, useState } from 'react';
import { CiSquareRemove } from 'react-icons/ci';

const CustomSelectIcon = ({
  isMulti = false,
  options,
  setOptions,
  selectedOptions,
  setSelectedOptions,
  searchTerm,
  setSearchTerm,
  placeholder,
}) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleOptionClick = (option) => {
    if (isMulti) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
  };

  const filteredOptions = options.filter((option) =>
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
    <div ref={dropdownRef} className="relative w-full">
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
          value={isFocused?searchTerm:''}
          onChange={handleSearch}
        />
        <div
          ref={elementRef}
          className="absolute top-1/2 -translate-y-1/2 px-2 flex gap-1 ">
          {selectedOptions.map((option) => (
            <div
              key={option.id}
              className="bg-base-100 text-primary border text-xs px-1 py-0.5 rounded-md flex items-center gap-1">
              {option.label}
              <CiSquareRemove
                onClick={() =>
                  setSelectedOptions(
                    selectedOptions.filter((so) => so?.id !== option?.id)
                  )
                }
                className={`cursor-pointer hover:text-error`}
              />
            </div>
          ))}
        </div>
      </div>

      <ul
        className={`${
          isFocused ? 'block' : 'hidden'
        } absolute w-full bg-primary mt-2 border border-gray-300 rounded-md scrollbar overflow-y-auto max-h-40 z-50`}>
        {filteredOptions.map((option) => (
          <li
            key={option.id}
            className={`px-4 py-2 cursor-pointer ${
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
      </ul>
    </div>
  );
};

export default CustomSelectIcon;
