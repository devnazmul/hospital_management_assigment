// ===========================================
// #00108
// ===========================================

import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { getAllAppointments } from '../../apis/appointment/appointment';
import CreateAppointment from '../../components/CreateAppointment';
import CreateAppointmentPatient from '../../components/CreateAppointmentPatient';
import CustomToaster from '../../components/CustomToaster';
import Table from '../../components/Table';

export default function Appointment() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'));
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // API RELATED
  const [totalData, setTotalData] = useState(0);

  // IS ANY CHANGE ON TABLE
  const [isUpdated, setIsUpdated] = useState(Math.random());

  useEffect(() => {
    setIsLoading(true);
    getAllAppointments()
      .then((res) => {
        console.log(res);
        setAppointments(
          res?.data.map((appointment) => ({
            id: appointment?._id,
            patient: appointment?.patient_name,
            doctor: appointment?.doctor_name,
            status:
              appointment?.status === 'pending' ? (
                <span className="px-3 font-semibold py-2 rounded-md text-gray-600 bg-gray-300">
                  {appointment?.status}
                </span>
              ) : appointment?.status === 'approved' ? (
                <span className="px-3 font-semibold py-2 rounded-md text-green-600 bg-green-300">
                  {appointment?.status}
                </span>
              ) : (
                <span className="px-3 font-semibold py-2 rounded-md text-blue-600 bg-blue-300">
                  {appointment?.status}
                </span>
              ),
            date: appointment?.schedule_date
              ? moment(appointment?.schedule_date).format('LL')
              : 'Not approved yet',
          }))
        );
        setTotalData(res?.total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={'error'}
            text={`ID: #00108 - ${error?.response?.data?.message}`}
          />
        ));
      });
  }, [isUpdated]);

  // // HANDLE VIEW
  // const handleView = (id) => {};
  // // HANDLE EDIT
  // const handleEdit = (id) => {
  //   navigate(`/invoice/update/${id}`);
  // };
  // // HANDLE DELETE
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     input:'text',
  //     text: 'give your security pin to confirm',
  //     icon: 'warning',
  //     inputAttributes: {
  //       autocapitalize: 'off',
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: 'Delete',
  //     showLoaderOnConfirm: true,
  //     preConfirm: (pin) => {
  //       return deleteSingleInvoice(id, pin)
  //         .then((res) => {
  //           setIsUpdated(Math.random());
  //           playAlartSound();
  //           return res;
  //         })
  //         .catch((error) => {
  //           throw new Error(error.message)
  //         });
  //     },
  //     allowOutsideClick: () => !Swal.isLoading(),
  //   }).then((result) => {
  //       Swal.fire('Deleted!', '', 'success');
  //   }).catch(error=>{
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Your pin is wrong!',
  //     })
  //   });
  // };

  const [addPopup, setAddPopup] = useState(false);
  const closeModal = () => setAddPopup(false);
  useEffect(() => {
    console.log(addPopup);
  }, [addPopup]);

  return (
    <div className="w-full h-[85vh] px-1 md:h-[75vh] overflow-y-auto scrollbar pr-3">
      <Popup
        className="addCustomerPopup"
        open={addPopup}
        onClose={() => {
          setAddPopup(false);
        }}
        position="right center">
        <div className="w-full bg-base-100 h-full py-5 px-5 relative">
          <button
            onClick={() => {
              setAddPopup(false);
            }}
            className="absolute top-1 right-1">
            <MdOutlineCancel className="text-error text-2xl" />
          </button>
          {user?.role === 'assistant'&&<CreateAppointment setIsUpdated={setIsUpdated} setAddPopup={setAddPopup} />}
          {user?.role === 'patient'&&<CreateAppointmentPatient setIsUpdated={setIsUpdated} setAddPopup={setAddPopup} />}
        </div>
      </Popup>
      <div className="flex justify-between items-center my-5">
        <h1 className="text-3xl font-semibold text-primary">Appointments</h1>
        {user?.role !== 'doctor' && (
          <button
            onClick={() => setAddPopup(true)}
            className="btn btn-primary text-base-100 rounded-full w-32">
            + Add New
          </button>
        )}
      </div>

      <div>
        <Table
          rows={appointments}
          cols={['status', 'patient', 'doctor', 'schedule']}
          isLoading={isLoading}
          // handleView={() => {}}
          // handleEdit={handleEdit}
          // handleDelete={handleDelete}
          handleView={() => {}}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </div>
    </div>
  );
}
