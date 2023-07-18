import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdDoneOutline } from 'react-icons/md';
import { sendInvoicePayRecipt } from '../apis/invoice/invoice';
import { useInvoiceDetails } from '../context/InvoiceContext';
import CustomToaster from './CustomToaster';

export default function SendReceiptPopup({
  showModal,
  setShowModal,
  formData,
  setFormData,
  setPopupTab,
  setIsUpdateData,
  businessInfo,
}) {
  const [errors, setErrors] = useState({});
  const { paymentId, paymentDone } = useInvoiceDetails();
  const [data, setData] = useState({
    invoice_id: formData?.id,
    invoice_payment_id: paymentId,
    from: businessInfo?.email,
    to: [],
    subject: `Payment Receipt for Invoice ${formData?.invoice_number}`,
    message: `
    Hi ${formData?.business_name},
    \n
    Here's your payment receipt for Invoice #7, for £${parseFloat(
      paymentDone
    ).toFixed(1)} GBP.
    \n
    You can always view your invoice online, at: 
    https:// /share/invoice/:randString/:id
    \n
    If you have any questions, please let us know.
    \n
    Thanks,
    ${formData?.business_name}
    `,
    copy_to_myself: 0,
  });

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!data?.from || data?.from.trim() === '') {
      newErrors.from = 'Email is required';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        data.from.trim()
      )
    ) {
      newErrors.from = 'Invalid email';
    }

    if (!(data?.to.length > 0)) {
      newErrors.to = 'Email is required';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        data.to[0].trim()
      )
    ) {
      newErrors.to = 'Invalid email';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    if (name === 'to') {
      setData({ ...data, [name]: [value] });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  const handleChangeCheck = (e) => {
    const { name, checked } = e.target;
    setData({ ...data, [name]: checked ? 1 : 0 });
  };

  const [sendSuccess, setSendSuccess] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    if (validateForm()) {
      sendInvoicePayRecipt(data)
        .then((res) => {
          if (res) {
            setSendSuccess(true);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={'error'}
              text={`ID: #00159 - ${error?.response?.data?.message}`}
            />
          ));
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/*first*/}
      <div className="relative p-6 flex-auto h-[65vh] text-black overflow-y-auto scrollbar">
        {/* TAB  */}

        {/* BODY  */}
        <div className="overflow-y-auto ">
          <>
            {sendSuccess ? (
              <div className="flex flex-col justify-center items-center gap-6 h-96">
                <MdDoneOutline className="text-green-500 text-9xl" />
                <h2 className="text-3xl text-center font-bold">
                  This receipt was sent
                </h2>
              </div>
            ) : (
              <form className="px-7 py-5 bg-primary mt-1 rounded-md flex text-base-100 flex-col gap-5">
                {/* EMAIL  */}
                <div
                  className={`w-full flex items-center justify-start flex-col`}>
                  <label className="w-full font-semibold flex gap-1">
                    From
                    <span className="text-red-600 font-semibold text-2xl">
                      *
                    </span>
                  </label>
                  <div className="w-full flex flex-col justify-center">
                    <input
                      defaultValue={data?.from}
                      name="from"
                      onChange={handleChangeData}
                      className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                      placeholder="Enter email that from you want to send invoice"
                      type="email"
                      required
                    />
                    {errors.from && (
                      <span className="text-xs text-red-600">
                        {errors?.from}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`w-full flex items-center justify-start flex-col`}>
                  <label className="w-full font-semibold flex gap-1">
                    To
                    <span className="text-red-600 font-semibold text-2xl">
                      *
                    </span>
                  </label>
                  <div className="w-full flex flex-col justify-center">
                    <input
                      defaultValue={data?.to}
                      name="to"
                      onChange={handleChangeData}
                      className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                      placeholder="Enter email that you want to send invoice"
                      type="email"
                      required
                    />
                    {errors.to && (
                      <span className="text-xs text-red-600">{errors?.to}</span>
                    )}
                  </div>
                </div>

                {/* SUBJECT  */}
                <div
                  className={`w-full flex items-center justify-start flex-col`}>
                  <label className="w-full font-semibold flex gap-1">
                    Subject
                  </label>
                  <div className="w-full flex flex-col justify-center">
                    <input
                      defaultValue={data?.subject}
                      name="subject"
                      onChange={handleChangeData}
                      className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                      placeholder="Enter email that you want to send invoice"
                      type="text"
                      required
                    />
                    {errors.subject && (
                      <span className="text-xs text-red-600">
                        {errors?.subject}
                      </span>
                    )}
                  </div>
                </div>

                {/* MESSAGE  */}
                <div
                  className={`w-full flex items-start justify-start flex-col`}>
                  <label className="w-4/12 md:w-2/12 font-semibold flex gap-1">
                    Message
                  </label>
                  <div className="w-full flex flex-col justify-center">
                    <textarea
                      defaultValue={data?.message}
                      row={10}
                      className={`placeholder:text-neutral bg-transparent border-2 border-base-100 outline-none shadow-md rounded-md py-2 px-2 w-full`}
                      placeholder="Enter email that you want to send invoice"
                      type="text"
                      name="message"
                      onChange={handleChangeData}
                      required></textarea>
                    {errors.message && (
                      <span className="text-xs text-red-600">
                        {errors?.message}
                      </span>
                    )}
                  </div>
                </div>

                <label
                  htmlFor="copy_to_myself"
                  className="cursor-pointer label flex justify-start items-center gap-2 w-full">
                  <input
                    name="copy_to_myself"
                    onChange={handleChangeCheck}
                    id="copy_to_myself"
                    type="checkbox"
                    className="checkbox checkbox-info"
                  />
                  <span className="block">Send a copy to yourself</span>
                </label>
              </form>
            )}
          </>
        </div>
      </div>

      {/*footer*/}
      <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
        <>
          {sendSuccess ? (
            <div className="w-full flex justify-end">
              <button
                onClick={() => {
                  setIsUpdateData(Math.random());
                  setPopupTab('payment');
                  setShowModal(false);
                  setSendSuccess(false);
                }}
                className="btn text-xs btn-error btn-outline rounded-full px-5">
                Close
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-between">
              <div>
                <button
                  onClick={() => {
                    setIsUpdateData(Math.random());
                    setPopupTab('payment');
                    setShowModal(false);
                    setSendSuccess(false);
                  }}
                  className="btn text-xs btn-error btn-outline rounded-full px-5">
                  Cancel
                </button>
              </div>
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={handleSubmit}
                  className="btn text-xs rounded-full px-5">
                  {isLoading ? (
                    <span className="loading loading-spinner text-primary loading-md"></span>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}
