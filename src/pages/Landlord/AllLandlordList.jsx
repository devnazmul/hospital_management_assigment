// ===========================================
// #00109
// ===========================================

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  deleteSingleLandlord,
  getAllLandlords,
} from '../../apis/landLord/landlord';
import CustomPerPageSelector from '../../components/CustomPerPageSelector';
import CustomToaster from '../../components/CustomToaster';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import { playAlartSound } from '../../utils/playAlart';

export default function AllLandlordList() {
  const navigate = useNavigate();

  const [Landlords, setLandlords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // API RELATED
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchKey, setsearchKey] = useState('');
  const [totalData, setTotalData] = useState(0);

  // IS ANY CHANGE ON TABLE
  const [isUpdated, setIsUpdated] = useState(Math.random());

  useEffect(() => {
    setIsLoading(true);
    getAllLandlords({ perPage, pageNo, startDate, endDate, searchKey })
      .then((res) => {
        setLandlords(
          res?.data.map((landlord) => ({
            id: landlord?.id,
            name: landlord?.first_Name + ' ' + landlord?.last_Name,
            email: landlord?.email,
            address: landlord?.address_line_1,
          }))
        );
        setTotalData(res?.total);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={'error'}
            text={`ID: #00109 - ${error?.response?.data?.message}`}
          />
        ));
      });
  }, [perPage, pageNo, startDate, endDate, searchKey, isUpdated]);

  // HANDLE VIEW
  const handleView = (id) => {};
  // HANDLE EDIT
  const handleEdit = (id) => {
    navigate(`/landlord/update/${id}`);
  };
  // HANDLE DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        deleteSingleLandlord(id)
          .then(() => {
            setIsUpdated(Math.random());
            setIsLoading(false);
            playAlartSound();
            toast.custom((t) => (
              <CustomToaster
                t={t}
                type={'success'}
                text={'Deleted Successfully!'}
              />
            ));
          })
          .catch((error) => {
            setIsLoading(false);
            toast.custom((t) => (
              <CustomToaster
                t={t}
                type={'error'}
                text={`ID: #00109 - ${error?.response?.data?.message}`}
              />
            ));
          });
      }
    });
  };

  return (
    <div className="w-full h-[85vh] px-1 md:h-[75vh] overflow-y-auto scrollbar pr-3">
      <div className='flex justify-between items-center my-5'>
      <h1 className="text-3xl text-primary font-semibold">All Landlords</h1>
      <NavLink
          to={'/landlord/create'}
          className="btn btn-primary text-base-100 rounded-full w-32">
          + Add New
        </NavLink>
      </div>
      <div>
        <Table
          rows={Landlords}
          cols={['name', 'email', 'address']}
          isLoading={isLoading}
          perPage={perPage}
          setPerPage={setPerPage}
          handleView={() => {}}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setPageNo={setPageNo}
          totalData={totalData}
        />
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center gap-2 py-5">
        <CustomPerPageSelector setPerPage={setPerPage} />


          <div>
            <Pagination
              itemsPerPage={perPage}
              totalItems={totalData}
              setPageNo={setPageNo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
