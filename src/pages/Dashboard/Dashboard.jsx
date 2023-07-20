import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getDashboardData } from '../../apis/auth/auth';
import CustomLoading from '../../components/CustomLoading';
import CustomToaster from '../../components/CustomToaster';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true);
    getDashboardData()
      .then((res) => {
        setData(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={'error'}
            text={`ID: #00110 - ${error?.response?.data?.message}`}
          />
        ));
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div className='px-10 py-5'>
          <h1 className="text-2xl font-bold text-primary my-2">Dashboard</h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-10 mt-5 h-[60vh]">
            <div className="bg-secondary shadow-lg shadow-secondary rounded-lg h-72 flex justify-center items-center text-base-100 text-3xl font-bold flex-col gap-10">
              <span className="text-[7rem]">{data?.patients}</span>
              <span>Patients</span>
            </div>
            <div className="bg-error shadow-lg shadow-error rounded-lg h-72 flex justify-center items-center text-base-100 text-3xl font-bold flex-col gap-10">
              <span className="text-[7rem]">{data?.appointments}</span>
              <span>Appointments</span>
            </div>
            <div className="bg-primary shadow-lg shadow-primary rounded-lg h-72 flex justify-center items-center text-base-100 text-3xl font-bold flex-col gap-10">
              <span className="text-[7rem]">{data?.doctors}</span>
              <span>Doctors</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
