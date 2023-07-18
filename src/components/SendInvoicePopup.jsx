import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiLinkExternal } from 'react-icons/bi';
import { FiCopy } from 'react-icons/fi';
import { MdDoneOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { sendInvoice } from '../apis/invoice/invoice';
import CustomToaster from './CustomToaster';

export default function SendInvoicePopup({
  showModal,
  setShowModal,
  formData,
  setFormData,
}) {
  const [step, setStep] = useState('send');

  const [errors, setErrors] = useState({});

  const inputRef = useRef(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      setShowModal(false);
    }
  };
  const handleCopyAndSend = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');

      setFormData({ ...formData, status: 'sent' });
      setShowModal(false);
    }
  };

  // =========================
  // SENT STEP
  // =========================

  const [data, setData] = useState({
    id: formData?.id,
    from: 'md.nazmul.islam1332@gmail.com',
    to: [],
    subject: '',
    message: '',
    copy_to_myself: 0,
    attach_pdf: 0,
  });

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!data?.from||data?.from.trim()==='') {
      newErrors.from = 'Email is required';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        data.from.trim()
      )
    ) {
      newErrors.from = 'Invalid email';
    }
    
    if (!(data?.to.length>0)) {
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
      sendInvoice(data)
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
    }else{
      setIsLoading(false);
    }
  };
  return (
    <>
      {/*first*/}
      <div className="relative p-6 flex-auto h-[65vh] text-black overflow-y-auto scrollbar">
        {/* TAB  */}
        <div className="flex justify-center items-center relative">
          <span className="bg-base-100 absolute top-1/2 h-0.5 w-full"></span>
          <div className="tabs tabs-boxed w-44 gap-3 z-10">
            <button
              onClick={() => {
                setStep('send');
              }}
              className={`tab ${step === 'send' && 'tab-active'}`}>
              Send
            </button>
            <button
              onClick={() => {
                setStep('share');
              }}
              className={`tab ${step === 'share' && 'tab-active'}`}>
              Share link
            </button>
          </div>
        </div>

        {/* BODY  */}
        <div className="overflow-y-auto ">
          {step === 'send' ? (
            <>
              {sendSuccess ? (
                <div className="flex flex-col justify-center items-center gap-6 h-96">
                  <MdDoneOutline className="text-green-500 text-9xl" />
                  <h2 className="text-3xl text-center font-bold">This invoice was sent</h2>
                </div>
              ) : (
                <form className="px-7 py-5 bg-primary mt-1 rounded-md flex text-base-100 flex-col gap-5">
                  {/* EMAIL  */}
                  {/* <div
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
                  </div> */}
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
                        <span className="text-xs text-red-600">
                          {errors?.to}
                        </span>
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
                      defaultValue={data?.message }

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

                  <label
                    htmlFor="pdf_attached"
                    className="cursor-pointer label flex justify-start items-center gap-2 w-full">
                    <input
                      name="attach_pdf"
                      onChange={handleChangeCheck}
                      id="pdf_attached"
                      type="checkbox"
                      className="checkbox checkbox-info"
                    />

                    <span className="block">Attach the invoice as a PDF</span>
                  </label>
                </form>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center flex-col gap-5 pt-16">
              <span className="block">
                Your customer can view the invoice at this link:
              </span>
              <input
                ref={inputRef}
                type="text"
                value={'https://link.waveapps.com/au7z2e-zpy7wa'}
                placeholder="Type here"
                className="input w-full max-w-xs text-primary"
              />
              <span className="block">
                Copy the link and share it with your customer.
              </span>

              <span>
                <NavLink
                  className={`text-secondary flex justify-center items-center gap-1 font-semibold`}
                  to={'/'}
                  target="_blank"
                  rel="noopener noreferrer">
                  Preview in new window <BiLinkExternal />
                </NavLink>
              </span>
            </div>
          )}
        </div>
      </div>

      {/*footer*/}
      <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
        {step === 'send' ? (
          <>
            {sendSuccess ? (
              <div className="w-full flex justify-end">
                <button
                  onClick={() => {
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
                      setShowModal(false);
                      setSendSuccess(false);
                    }}
                    className="btn text-xs btn-error btn-outline rounded-full px-5">
                    Cancel
                  </button>
                </div>
                <div className="flex justify-center items-center gap-3">
                  {/* <button className="btn text-xs btn-base-100 btn-outline border-base-100 text-base-100 rounded-full px-5">
                    Preview as customer
                  </button> */}
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
        ) : (
          <div className="w-full flex justify-between">
            <div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSendSuccess(false);
                }}
                title="cancel"
                className="btn text-xs btn-error btn-outline rounded-full px-5">
                Cancel
              </button>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button
                title="copy"
                onClick={handleCopy}
                className="btn text-xs btn-base-100 btn-outline border-base-100 text-base-100 rounded-full px-5">
                <FiCopy className="text-xl" />
              </button>
              <button
                title="copy and mark as sent"
                onClick={handleCopyAndSend}
                className="btn text-xs rounded-full px-5">
                Copy and mark as sent
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
