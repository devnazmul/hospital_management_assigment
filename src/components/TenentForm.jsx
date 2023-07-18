// ===========================================
// #00175
// ===========================================

import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createTenant } from "../apis/tenant/tenant";
import CustomToaster from "./CustomToaster";


export default function TenentForm({handlePopupClose}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: 'image.jpg',
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    city: '',
    postcode: '',
    lat: '',
    long: '',
  });
  const [errors, setErrors] = useState({});

  // CHANGE FIELD CONTENT
  const onChangeFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // AUTO COMPLETE HANDLER
  
  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    onPlaceSelected: (place) => {
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'long_name',
      };
      const value = {
        full_address: place?.formatted_address,
        street_number: '',
        route: '',
        locality: '',
        administrative_area_level_1: '',
        country: '',
        postal_code: '',
        coordinates: {
          lat: place?.geometry?.location?.lat(),
          lng: place?.geometry?.location.lng(),
        },
      };

      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          value[addressType] = val;
        }
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        address_line_1: value?.full_address,
        country: value?.country,
        city: value?.locality,
        postcode: value?.postal_code,
        lat: `${value?.coordinates?.lat}`,
        long: `${value?.coordinates?.lng}`,
      }));
    },
  });

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!formData.first_Name || formData.first_Name.trim() === '') {
      newErrors.first_Name = 'First name is required';
    }

    // Validate phone number
    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{11}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must have 11 digits';
    }

    // Validate email
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = 'Invalid email';
    }

    // Validate address
    if (!formData.address_line_1 || formData.address_line_1.trim() === '') {
      newErrors.address_line_1 = 'Address is required';
    }

    // Validate postcode
    if (!formData.postcode || formData.postcode.trim() === '') {
      newErrors.postcode = 'Postcode is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };


  // HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    console.log('first')
    e.preventDefault();
    setIsLoading(true);
    if (validateForm()) {
      // Form is valid, submit the data
      // You can perform your submit logic here
      createTenant(formData)
        .then((res) => {
          setIsLoading(false);
          setFormData({
            image: 'image.jpg',
            first_Name: '',
            last_Name: '',
            email: '',
            phone: '',
            address_line_1: '',
            address_line_2: '',
            country: '',
            city: '',
            postcode: '',
            lat: '',
            long: '',
          });
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'success'}
              text={'A new landlord was created successfully.'}
            />
          ));
          handlePopupClose()
        })
        .catch((error) => {
          setIsLoading(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'error'}
              text={`ID: #00175 - ${error?.response?.data?.message}`}
            />
          ));
        });
    } else {
      setIsLoading(false);
      // Form is invalid, do something (e.g., display error messages)
      console.log('Form validation failed');
    }
  };

  return (
    <div className="border-y-2 py-5">
       <h1 className="my-5 text-base-100 font-bold text-xl text-center">Add New TenAnt</h1>
      <form className=" bg-primary mt-1 rounded-md flex text-base-100 flex-col gap-5">
        {/* FIRST NAME  */}
        <div className={`w-full flex flex-col items-center justify-start`}>
          <label className="flex w-full font-semibold">
            First Name{' '}
            <span className="text-red-600 font-semibold text-2xl">
              *
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <input
              onChange={onChangeFormData}
              className={`placeholder:text-gray-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
              placeholder="Enter Your First Name"
              type="text"
              name="first_Name"
              required
            />
            {errors.first_Name && (
              <span className="text-xs text-red-600">{errors.first_Name}</span>
            )}
          </div>
        </div>

        {/* SECOND NAME  */}
        <div className={`w-full flex flex-col items-center justify-start`}>
          <label className="flex w-full font-semibold">
            Last Name
            <span className="text-red-600 font-semibold text-2xl">
              *
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <input
              onChange={onChangeFormData}
              className={`placeholder:text-gray-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
              placeholder="Enter Your Last Name"
              type="text"
              name="last_Name"
            />
          </div>
        </div>

        {/* PHONE  */}
        <div className={`w-full flex flex-col items-center justify-start`}>
          <label className="flex w-full font-semibold">
            Phone{' '}
            <span className="text-red-600 font-semibold text-2xl">
              *
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <input
              required
              onChange={onChangeFormData}
              className={`placeholder:text-gray-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
              placeholder="Enter Your Phone Number"
              type="text"
              name="phone"
            />
            {errors.phone && (
              <span className="text-xs text-red-600">{errors.phone}</span>
            )}
          </div>
        </div>

        {/* EMAIL  */}
        <div className={`w-full flex flex-col items-center justify-start`}>
          <label className="flex w-full font-semibold">
            Email{' '}
            <span className="text-red-600 font-semibold text-2xl">
              *
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <input
              required
              onChange={onChangeFormData}
              className={`placeholder:text-gray-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
              placeholder="Enter Your Email"
              type="email"
              name="email"
            />
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email}</span>
            )}
          </div>
        </div>

        {/* ADDRESS  */}
        <div className={`w-full flex flex-col items-center justify-start`}>
          <label className="flex w-full font-semibold">
            Address{' '}
            <span className="text-red-600 font-semibold text-2xl">
              *
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <input
              required
              ref={ref}
              className={`placeholder:text-gray-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
              placeholder="Enter Your Address"
              type="text"
              name=""
            />
            {errors.address && (
              <span className="text-xs text-red-600">{errors.address}</span>
            )}
          </div>
        </div>

        {/* EMAIL  */}
        <div className={`w-full flex flex-col items-center justify-start`}>
          <label className="flex  w-full font-semibold">
            Postcode{' '}
            <span className="text-red-600 font-semibold text-2xl">
              *
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <input
              required
              onChange={onChangeFormData}
              className={`placeholder:text-gray-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
              placeholder="Postcode"
              type="text"
              defaultValue={formData?.postcode}
              name="postcode"
            />
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email}</span>
            )}
          </div>
        </div>

       
      </form>
      {/* BUTTONS  */}
      <div className={`flex justify-end items-center gap-5 my-5`}>
          <button
          onClick={handlePopupClose}
            className={`transition-all duration-150 hover:scale-90 border-2 px-5 w-32 py-1 rounded-full border-base-100 bg-primary justify-center items-center flex shadow-md`}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`transition-all duration-150 hover:scale-90 border-2 px-5 w-40 py-1 rounded-full border-base-100 bg-base-100 text-primary shadow-md shadow-base-100 flex justify-center items-center`}>
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Add new tenant'
            )}
          </button>
        </div>

    </div>
  );
}
