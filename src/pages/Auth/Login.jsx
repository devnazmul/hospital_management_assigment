// ===========================================
// #00126
// ===========================================

import React, { useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../apis/auth/auth';
import CustomToaster from '../../components/CustomToaster';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: '12345678',
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

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

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

    // Validate password
    // if (!formData.password || formData.password.trim() === '') {
    //   console.log(formData);
    //   newErrors.password = 'Password is required';
    // } else if (
    //   !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData.password)
    // ) {
    //   newErrors.password =
    //     'Password must be at least 8 characters long and contain at least 1 number, 1 lowercase letter, and 1 uppercase letter';
    // }

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
    login(formData)
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
            text={`ID: #00126 - ${error?.response?.data?.message}`}
          />
        ));
      });
    console.log('Form submitted:', formData);
    } else {
    // Form is invalid, do something (e.g., display error messages)
    console.log('Form validation failed');
    }
  };

  // const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      window.location.href='/'
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full h-screen flex justify-end items-center relative">
      <Toaster position="top-right" reverseOrder={false} />

      <img
        className="w-full h-full object-cover absolute"
        src={'/assets/login.jpg'}
        alt=""
      />
      <div className="w-full h-full flex justify-end items-center p-5">
        <div className="card h-full w-full md:w-1/3 glass">
          <div className="card-body">
            <h2 className="font-semibold text-4xl text-center text-white">
              Login
            </h2>
            <p className="text-center text-white my-3">
              Want to manage your realstate business? Please login.
            </p>
            <div className="h-full w-full">
              <div className="my-3 flex flex-col w-full relative">
                <label
                  htmlFor="Email"
                  className="text-white text-lg font-medium">
                  Email
                </label>
                <input
                  defaultValue={formData?.email}
                  onChange={onChangeFormData}
                  id="Email"
                  type="email"
                  name="email"
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
                  htmlFor="Password"
                  className="text-white text-lg font-medium">
                  Password
                </label>
                <input
                  defaultValue={formData?.password}
                  name="password"
                  onChange={onChangeFormData}
                  id="Password"
                  type="password"
                  placeholder="Password"
                  className="input w-full my-2 bg-transparent placeholder:text-base-400 border-gray-200 text-white"
                  required
                />
                {errors.password && (
                  <span className="absolute text-xs -bottom-3 text-red-600">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="text-primary">
                Didn't have an account?{' '}
                <NavLink className={'text-base-100'} to={`/auth/registration`}>Create account?</NavLink>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="btn btn-base-100 w-full text-primary">
                {isLoading ? (
                  <span className="loading loading-spinner text-primary loading-md"></span>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
