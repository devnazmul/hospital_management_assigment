// ===========================================
// #00176
// ===========================================

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createRepairCategory } from '../apis/repairCategory/repairCategory';
import CustomSelectIcon from './CustomSelectIcon';
import CustomToaster from './CustomToaster';

export default function RepairCategoryForm({ handlePopupClose }) {
  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);
  const [icons2, setIcons2] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState([]);
  const [iconSearchTearm, setIconSearchTearm] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    icon: '',
    name: '',
  });

  useEffect(() => {
    getLandloardData();
  }, []);

  useEffect(() => {
    setFormData({ ...formData, icon: selectedIcon[0]?.label });
  }, [selectedIcon]);

  // FILTER ICON
  useEffect(() => {
    setIcons(
      icons2.filter((i) => i?.label.toLowerCase()?.includes(iconSearchTearm))
    );
  }, [iconSearchTearm]);

  // GET ALL ICONS
  const getLandloardData = async () => {
    const res = await fetch('/icon.json');
    const data = await res.json();
    setIcons(data.map((ico, i) => ({ id: i, label: ico?.name })));
    setIcons2(data.map((ico, i) => ({ id: i, label: ico?.name })));
  };

  //   ON CHANGE FIELD
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

    // Validate icon
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    // Validate name
    if (!formData.icon || formData.icon.trim() === '') {
      newErrors.icon = 'Icon is required';
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
      createRepairCategory(formData)
        .then(() => {
          setIsLoading(false);
          setFormData({
            icon: '',
            name: '',
          });
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'success'}
              text={'A new landlord was created successfully.'}
            />
          ));
          handlePopupClose();
        })
        .catch((error) => {
          setIsLoading(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'error'}
              text={`ID: #00176 - ${error?.response?.data?.message}`}
            />
          ));
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-y-2 py-2">
      <h1 className="mt-2 text-base-100 font-bold text-xl text-center">
        {`Add New Repair Category`}
      </h1>
      <div className=" py-5 bg-primary mt-1 rounded-md flex text-base-100 flex-col gap-5">
        {/* Icon  */}
        <div className={`w-full flex items-center justify-start flex-col`}>
          <label className="flex w-full font-semibold">
            Icon
            <span className="text-red-600 font-semibold text-2xl">
              *
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <CustomSelectIcon
              options={icons}
              setOptions={setIcons}
              selectedOptions={selectedIcon}
              setSelectedOptions={setSelectedIcon}
              searchTerm={iconSearchTearm}
              setSearchTerm={setIconSearchTearm}
              placeholder="Select icon"
            />
            {errors.icon && (
              <span className="mt-2 text-xs -bottom-3 text-red-600">
                {errors.icon}
              </span>
            )}
          </div>
        </div>

        {/* Name  */}
        <div className={`w-full flex items-center justify-start flex-col`}>
          <label className="flex w-full font-semibold">
            Name
            <span className="text-red-600 font-semibold text-2xl">
              <sup>*</sup>
            </span>
          </label>
          <div className="w-full flex flex-col justify-center">
            <input
              onChange={onChangeFormData}
              className={`placeholder:text-base-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2  w-full`}
              placeholder="Enter Name"
              type="text"
              name="name"
              required
            />
            {errors.name && (
              <span className="mt-2 text-xs -bottom-3 text-red-600">
                {errors.name}
              </span>
            )}
          </div>
        </div>

        {/* BUTTONS  */}
        <div className={`flex justify-end items-center gap-5`}>
          <button
            onClick={handlePopupClose}
            className={`transition-all duration-150 hover:scale-90 border-2 px-5 w-32 py-1 rounded-full border-base-100 bg-primary justify-center items-center flex shadow-md`}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`transition-all duration-150 hover:scale-90 border-2 px-5 w-42 text-primary py-1 rounded-full border-base-100 bg-base-100 shadow-md shadow-base-100 flex justify-center items-center`}>
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Add new category'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
