// ===========================================
// #00125
// ===========================================

import { useContext, useEffect, useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { Toaster, toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { registration } from '../../apis/auth/auth';
import CustomToaster from '../../components/CustomToaster';
import { AuthContext } from '../../context/AuthContext';

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
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
      console.log({ place });
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
    if (!formData.postcode || formData.postcode.trim() === '') {
      newErrors.postcode = 'Postcode is required';
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

    // Validate password
    if (!formData.password || formData.password.trim() === '') {
      console.log(formData);
      newErrors.password = 'Password is required';
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        'Password must be at least 8 characters long and contain at least 1 number, 1 lowercase letter, and 1 uppercase letter';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = `Password didn't match`;
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, submit the data
      // You can perform your submit logic here
      registration(formData)
        .then((res) => {
          localStorage.setItem('userData', JSON.stringify(res?.data));
          localStorage.setItem('token', res?.data?.token);
          setIsAuthenticated(true);
          setTimeout(() => {
            setIsLoading(false);
            navigate('/');
          }, 2000);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'error'}
              text={`ID: #00125 - ${error?.response?.data?.message}`}
            />
          ));
        });
      console.log('Form submitted:', formData);
    } else {
      setIsLoading(false);

      // Form is invalid, do something (e.g., display error messages)
      console.log('Form validation failed');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full h-screen flex justify-end items-center relative">
      <Toaster position="top-right" reverseOrder={false} />

      <img
        className="w-full h-screen object-cover absolute"
        src={'/assets/registration.jpg'}
        alt=""
      />
      <div className="w-full h-full flex justify-center items-start p-5  overflow-y-auto">
        <div className="card h-auto w-full md:w-2/3 glass">
          <div className="card-body">
            <h2 className="font-semibold text-4xl text-center text-white">
              Create Account
            </h2>
            <p className="text-center text-white my-3">
              The most reliable platform to manage your invoices.
            </p>
            <div className="h-full w-full">
              <div className="flex justify-between gap-2 items-center">
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="first_Name"
                    className="text-white text-lg font-medium">
                    First Name
                  </label>
                  <input
                    defaultValue={formData?.first_Name}
                    onChange={onChangeFormData}
                    id="first_Name"
                    type="text"
                    name="first_Name"
                    placeholder="First Name"
                    className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                    required
                  />
                  {errors.first_Name && (
                    <span className="absolute text-xs -bottom-3 text-red-600">
                      {errors.first_Name}
                    </span>
                  )}
                </div>
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="last_Name"
                    className="text-white text-lg font-medium">
                    Last Name
                  </label>
                  <input
                    defaultValue={formData?.last_Name}
                    onChange={onChangeFormData}
                    id="last_Name"
                    type="text"
                    name="last_Name"
                    placeholder="Last Name"
                    className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                    required
                  />
                  {errors.last_Name && (
                    <span className="absolute text-xs -bottom-3 text-red-600">
                      {errors.last_Name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="email"
                    className="text-white text-lg font-medium">
                    Email
                  </label>
                  <input
                    defaultValue={formData?.email}
                    name="email"
                    onChange={onChangeFormData}
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                    required
                  />
                  {errors.email && (
                    <span className="absolute text-xs -bottom-3 text-red-600">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="phone"
                    className="text-white text-lg font-medium">
                    Phone
                  </label>
                  <input
                    defaultValue={formData?.phone}
                    name="phone"
                    onChange={onChangeFormData}
                    id="phone"
                    type="phone"
                    placeholder="Phone"
                    className="input w-full my-2 bg-transparent placeholder:text-gray-200 border-gray-200 text-white"
                    required
                  />
                  {errors.phone && (
                    <span className="absolute block text-xs -bottom-3 text-red-600">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="address_line_1"
                    className="text-white text-lg font-medium">
                    Address
                  </label>
                  <input
                    ref={ref}
                    defaultValue={formData?.address_line_1}
                    // name="address_line_1"
                    // onChange={onChangeFormData}
                    id="address_line_1"
                    type="text"
                    placeholder="Address"
                    className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                    required
                  />
                  {errors.address_line_1 && (
                    <span className="absolute text-xs -bottom-3 text-red-600">
                      {errors.address_line_1}
                    </span>
                  )}
                </div>
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="address_line_1"
                    className="text-white text-lg font-medium">
                    Post code
                  </label>
                  <input
                    defaultValue={formData?.postcode}
                    name="postcode"
                    onChange={onChangeFormData}
                    id="postcode"
                    type="text"
                    placeholder="Postcode"
                    className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                    required
                  />
                  {errors.postcode && (
                    <span className="absolute text-xs -bottom-3 text-red-600">
                      {errors.postcode}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="password"
                    className="text-white text-lg font-medium">
                    Password
                  </label>
                  <input
                    defaultValue={formData?.password}
                    name="password"
                    onChange={onChangeFormData}
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                    required
                  />
                  {errors.password && (
                    <div className="absolute text-xs -bottom-7 text-red-600">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="my-3 flex flex-col w-full relative">
                  <label
                    htmlFor="password_confirmation"
                    className="text-white text-lg font-medium">
                    Confirm password
                  </label>
                  <input
                    defaultValue={formData?.password_confirmation}
                    name="password_confirmation"
                    onChange={onChangeFormData}
                    id="password_confirmation"
                    type="password"
                    placeholder="Confirm password"
                    className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                    required
                  />
                  {errors.password_confirmation && (
                    <span className="absolute text-xs -bottom-7 text-red-600">
                      {errors.password_confirmation}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-white my-5">
                Already have an account?{' '}
                <NavLink className={'text-base-100'} to={`/auth/login`}>
                  Login
                </NavLink>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="btn btn-base-100 w-full text-white">
                {isLoading ? (
                  <span className="loading loading-spinner text-primary loading-md"></span>
                ) : (
                  'Registration'
                )}
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
