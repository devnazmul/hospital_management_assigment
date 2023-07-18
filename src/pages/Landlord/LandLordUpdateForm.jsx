// ===========================================
// #00136
// ===========================================

import { useEffect, useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  getSingleLandlord,
  updateSingleLandlord
} from '../../apis/landLord/landlord';
import CustomLoading from '../../components/CustomLoading';
import CustomToaster from '../../components/CustomToaster';

export default function LandLordUpdateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id:'',
    image: '',
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
  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    setIsDataLoading(true);
    getSingleLandlord(id)
      .then((res) => {
        console.log(res);
        setFormData({
          id:id,
          image: res?.image,
          first_Name: res?.first_Name,
          last_Name: res?.last_Name,
          email: res?.email,
          phone: res?.phone,
          address_line_1: res?.address_line_1,
          address_line_2: res?.address_line_2,
          country: res?.country,
          city: res?.city,
          postcode: res?.postcode,
          lat: res?.lat,
          long: res?.long,
        });
        setIsDataLoading(false);
      })
      .catch((error) => {
        setIsDataLoading(false);
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={'error'}
            text={`ID: #00136 - ${error?.response?.data?.message}`}
          />
        ));
      });
  }, [id]);

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

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validateForm()) {
      // Form is valid, submit the data
      // You can perform your submit logic here
      updateSingleLandlord(formData)
        .then((res) => {
          setIsLoading(false);
          setFormData({
            image: 'https://i.ibb.co/02q5FpM/avater.png',
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
          navigate('/landlord');
        })
        .catch((error) => {
          setIsLoading(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'error'}
              text={`ID: #00136 - ${error?.response?.data?.message}`}
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
    <>
      {isDataLoading ? (
        <CustomLoading />
      ) : (
        <div className="w-full h-[85vh] px-1 md:h-[75vh] overflow-y-auto scrollbar pr-3">
          <h1 className="text-2xl font-semibold text-primary mt-2 mb-4 text-center">
            Update Landlord Details
          </h1>
          <form className="px-7 py-20 bg-primary mt-1 rounded-md flex text-base-100 flex-col gap-5">
            {/* FIRST NAME  */}
            <div className={`w-full flex items-center justify-start`}>
              <label className="block w-4/12 md:w-2/12 font-semibold">
                First Name{' '}
                <span className="text-red-600 font-semibold text-2xl">
                  <sup>*</sup>
                </span>
              </label>
              <div className="w-8/12 md:w-10/12 flex flex-col justify-center">
                <input
                  defaultValue={formData?.first_Name}
                  onChange={onChangeFormData}
                  className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                  placeholder="Enter Your First Name"
                  type="text"
                  name="first_Name"
                  required
                />
                {errors.first_Name && (
                  <span className="text-xs text-red-600">
                    {errors.first_Name}
                  </span>
                )}
              </div>
            </div>

            {/* SECOND NAME  */}
            <div className={`w-full flex items-center justify-start`}>
              <label className="block w-4/12 md:w-2/12 font-semibold">
                Last Name
              </label>
              <div className="w-8/12 md:w-10/12 flex flex-col justify-center">
                <input
                  defaultValue={formData?.last_Name}
                  onChange={onChangeFormData}
                  className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                  placeholder="Enter Your Last Name"
                  type="text"
                  name="last_Name"
                />
              </div>
            </div>

            {/* PHONE  */}
            <div className={`w-full flex items-center justify-start`}>
              <label className="block  w-4/12 md:w-2/12 font-semibold">
                Phone{' '}
                <span className="text-red-600 font-semibold text-2xl">
                  <sup>*</sup>
                </span>
              </label>
              <div className="w-8/12 md:w-10/12 flex flex-col justify-center">
                <input
                  defaultValue={formData?.phone}
                  required
                  onChange={onChangeFormData}
                  className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
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
            <div className={`w-full flex items-center justify-start`}>
              <label className="block  w-4/12 md:w-2/12 font-semibold">
                Email{' '}
                <span className="text-red-600 font-semibold text-2xl">
                  <sup>*</sup>
                </span>
              </label>
              <div className="w-8/12 md:w-10/12 flex flex-col justify-center">
                <input
                  defaultValue={formData?.email}
                  required
                  onChange={onChangeFormData}
                  className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                  placeholder="Enter Your Email"
                  type="text"
                  name="email"
                />
                {errors.email && (
                  <span className="text-xs text-red-600">{errors.email}</span>
                )}
              </div>
            </div>

            {/* ADDRESS  */}
            <div className={`w-full flex items-center justify-start`}>
              <label className="block  w-4/12 md:w-2/12 font-semibold">
                Address{' '}
                <span className="text-red-600 font-semibold text-2xl">
                  <sup>*</sup>
                </span>
              </label>
              <div className="w-8/12 md:w-10/12 flex flex-col justify-center">
                <input
                  defaultValue={formData?.address_line_1}
                  required
                  ref={ref}
                  className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                  placeholder="Enter Your Street Address"
                  type="text"
                  name=""
                />
                {errors.address && (
                  <span className="text-xs text-red-600">{errors.address}</span>
                )}
              </div>
            </div>

            {/* EMAIL  */}
            <div className={`w-full flex items-center justify-start`}>
              <label className="block  w-4/12 md:w-2/12 font-semibold">
                Postcode{' '}
                <span className="text-red-600 font-semibold text-2xl">
                  <sup>*</sup>
                </span>
              </label>
              <div className="w-8/12 md:w-10/12 flex flex-col justify-center">
                <input
                  defaultValue={formData?.postcode}
                  required
                  onChange={onChangeFormData}
                  className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                  placeholder="Postcode"
                  type="text"
                  name="postcode"
                />
                {errors.email && (
                  <span className="text-xs text-red-600">{errors.email}</span>
                )}
              </div>
            </div>

            {/* BUTTONS  */}
            <div
              className={`flex justify-center md:justify-end items-center gap-5 mt-10`}>
              <NavLink
                to={`/landlord`}
                className={`btn rounded-full btn-outline btn-base-100 hover:scale-90 w-32`}>
                Cancel
              </NavLink>
              <button
                onClick={handleSubmit}
                className={` btn rounded-full btn-secondary transition-all duration-150 hover:scale-90 border-2 px-5 w-32 py-1 border-secondary shadow-md shadow-secondary`}>
                {isLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
