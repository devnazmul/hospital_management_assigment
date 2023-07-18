import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdDoneOutline } from 'react-icons/md';
import Datepicker from 'react-tailwindcss-datepicker';
import { payInvoice } from '../apis/invoice/invoice';
import { useInvoiceDetails } from '../context/InvoiceContext';
import CustomSelect from './CustomSelect';
import CustomToaster from './CustomToaster';

export default function InvoicePaymentPopup({
  showModal,
  setShowModal,
  formData,
  setFormData,
  popupTab,
  setPopupTab,
  setIsUpdateData,
}) {
  const { setPaymentId, setPaymentDone } = useInvoiceDetails();
  const [data, setData] = useState({
    invoice_id: formData?.id,
    payment_method: '',
    payment_date: moment(new Date()).format('YYYY-MM-DD'),
    amount: formData?.total_due,
    note: '',
  });

  const [errors, setErrors] = useState({});

  // HANDLE CHANGE DATE
  const handleDateChange = (value) => {
    setData((prevFormData) => ({
      ...prevFormData,
      payment_date: moment(value?.startDate).format('YYYY-MM-DD'),
    }));
  };

  // CHANGE FIELD CONTENT
  const onChangeFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'amount') {
      if (
        parseFloat(Number(formData?.total_amount).toFixed(1)) >=
        parseFloat(Number(value).toFixed(1))
      ) {
        setData((prevFormData) => ({
          ...prevFormData,
          amount: value,
        }));
      }
    } else {
      setData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // SELECT
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 0,
      label: 'Cash',
    },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState([]);
  const [paymentMethodSearchTerm, setPaymentMethodSearchTerm] = useState('');

  useEffect(() => {
    setData({ ...data, payment_method: selectedPaymentMethod[0]?.label });
  }, [selectedPaymentMethod]);

  const [paymentAccounts, setPaymentAccounts] = useState([
    {
      id: 0,
      label: 'Cash on hand (£)',
    },
  ]);
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState([]);
  const [paymentAccountSearchTerm, setPaymentAccountSearchTerm] = useState('');

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};
    // Validate email

    if (
      data.payment_date.trim() === '' ||
      data.payment_date.trim() === 'Invalid date'
    ) {
      newErrors.payment_date = 'Payment date is required';
    }
    if (!(data.payment_method?.length > 0)) {
      newErrors.payment_method = 'Payment method is required';
    }
    if (!(parseFloat(data.amount) > 0)) {
      newErrors.amount = 'Payment amount is required';
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);
  // HANDLE SUBMIT
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSendLoading(true);
      payInvoice(data)
        .then((res) => {
          if (res) {
            console.log(res?.id);
            setPaymentId(res?.id);
            setPaymentDone(data?.amount);
            setIsSuccess(true);
            setIsSendLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsSendLoading(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'error'}
              text={`ID: #00126 - ${error?.response?.data?.message}`}
            />
          ));
        });
    }
  };
  return (
    <>
      {/*first*/}
      <div className="relative p-6 flex-auto h-[65vh] text-black overflow-y-auto scrollbar">
        {/* BODY  */}
        {isSuccess ? (
          <div className="flex flex-col justify-center items-center gap-6 h-72 w-full">
            <MdDoneOutline className="text-green-500 text-9xl" />
            <h2 className="text-3xl font-bold text-center">
              The payment was recorded.
            </h2>
          </div>
        ) : (
          <div className="overflow-y-auto ">
            <span className="text-center w-full block">
              Record a payment you’ve already received, such as cash, check, or
              bank payment.
            </span>
            <form className="px-7 py-5 bg-primary mt-1 rounded-md flex text-base-100 flex-col gap-5">
              {/* PAYMENT DATE  */}
              <div className={`w-full flex justify-start flex-col`}>
                <label className="w-full font-semibold flex gap-1">
                  Payment date
                  <span className="text-red-600 font-semibold text-2xl">*</span>
                </label>
                <div className="w-full flex flex-col justify-center">
                  <Datepicker
                    minDate={new Date()}
                    popoverDirection="down"
                    containerClassName={` w-full relative`}
                    inputClassName={`placeholder:text-base-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full text-base-100`}
                    displayFormat={'DD/MM/YYYY'}
                    placeholder={'Pick a Date'}
                    useRange={false}
                    asSingle={true}
                    value={{
                      startDate: data?.payment_date,
                      endDate: data?.payment_date,
                    }}
                    onChange={handleDateChange}
                  />
                  {errors.payment_date && (
                    <span className="text-xs text-red-600">
                      {errors?.payment_date}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount  */}
              <div className={`w-full flex flex-col justify-start`}>
                <label className="w-full font-semibold flex gap-1">
                  Amount
                  <span className="text-red-600 font-semibold text-2xl">*</span>
                </label>
                <div className="w-full flex flex-col justify-center relative">
                  <span className="absolute left-3 text-xl font-semibold">
                    &pound;
                  </span>
                  <input
                    className={`placeholder:text-base-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full pl-8`}
                    placeholder="Enter payment amount"
                    type="number"
                    name="amount"
                    required
                    value={data?.amount}
                    onChange={onChangeFormData}
                  />
                  {errors.amount && (
                    <span className="text-xs text-red-600">
                      {errors?.amount}
                    </span>
                  )}
                </div>
              </div>

              {/* Payment method  */}
              <div className={`w-full flex flex-col justify-start`}>
                <label className="w-full font-semibold flex gap-1">
                  Payment method
                  <span className="text-red-600 font-semibold text-2xl">*</span>
                </label>
                <div className="w-full flex flex-col justify-center">
                  <CustomSelect
                    placeholder={`Select a payment method`}
                    options={paymentMethods}
                    setOptions={setPaymentMethods}
                    selectedOptions={selectedPaymentMethod}
                    setSelectedOptions={setSelectedPaymentMethod}
                    searchTerm={paymentMethodSearchTerm}
                    setSearchTerm={setPaymentMethodSearchTerm}
                  />
                  {errors.payment_method && (
                    <span className="text-xs text-red-600">
                      {errors?.payment_method}
                    </span>
                  )}
                </div>
              </div>

              {/* MEMO  */}
              <div className={`w-full flex flex-col justify-start`}>
                <label className="w-full font-semibold flex gap-1">
                  Memo / Notes
                </label>
                <div className="w-full flex flex-col justify-center">
                  <textarea
                    onChange={onChangeFormData}
                    row={10}
                    className={`placeholder:text-base-400 bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                    placeholder="Enter email that you want to send invoice"
                    type="text"
                    name="note"
                    defaultValue={data?.note}
                    required></textarea>
                  {errors.note && (
                    <span className="text-xs text-red-600">{errors?.note}</span>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/*footer*/}
      <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
        {isSuccess ? (
          <div className="w-full flex justify-end gap-3">
            <button
              onClick={() => {
                setIsUpdateData(Math.random());
                setShowModal(false);
              }}
              className="btn btn-error btn-outline rounded-full px-5">
              Cancel
            </button>

            <button
              onClick={() => {
                setPopupTab('recipt');
              }}
              className="btn rounded-full px-5">
              Send a receipt
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-end gap-3">
            <button
              disabled={isSendLoading}
              onClick={() => {
                setShowModal(false);
              }}
              className="btn btn-error btn-outline rounded-full px-5">
              Cancel
            </button>

            <button
              disabled={isSendLoading}
              onClick={handleSubmit}
              className="btn rounded-full px-5">
              {isSendLoading ? (
                <span className="loading loading-spinner text-primary loading-md"></span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
