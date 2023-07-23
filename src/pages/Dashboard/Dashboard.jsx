import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getDashboardData } from '../../apis/auth/auth';
import CustomLoading from '../../components/CustomLoading';
import CustomToaster from '../../components/CustomToaster';
import Navbar from '../../layout/Navbar/Navbar';
import UserList from '../UserList/UserList';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const user = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    setIsLoading(true);
    getDashboardData()
      .then((res) => {
        console.log(res?.data)
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
      <nav className={``}>
        <Navbar title={'Dashboard'} />
      </nav>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div className="px-10 py-5 bg-offwhite">
          <div className="w-full flex items-center justify-between h-40 bg-base-100 shadow-lg rounded-3xl overflow-hidden">
            <div className="bg-primary w-72 h-full rounded-3xl shadow-lg px-5 py-5">
              <div className="flex items-center gap-5">
                <img
                  className="w-12 h-12 object-cover rounded-lg shadow-md"
                  src={user?.profile_pic_url}
                  alt=""
                />
                <div>
                  <h1 className="text-xl font-semibold text-base-100">
                    {user?.name}
                  </h1>
                  <p className="text-base-100 font-thin">{user?.role}</p>
                </div>
              </div>
              <div>
                <h3 className='w-full text-center mt-5 text-base-100 text-md'>{user?.email}</h3>
              </div>
            </div>
            <div className="flex justify-evenly h-full w-full py-5">
                <div className='text-black w-1/3'>
                  <h1 className='text-center font-semibold text-gray-400'>Patients</h1>
                  <span className="text-8xl text-gray-700 font-semibold text-center w-full block">{data?.patients}</span>
                </div>
                <div className='text-black w-1/3'>
                  <h1 className='text-center font-semibold text-gray-400'>Appointments</h1>
                  <span className="text-8xl text-gray-700 font-semibold text-center w-full block">{data?.appointments}</span>
                </div>
                <div className='text-black w-1/3'>
                  <h1 className='text-center font-semibold text-gray-400'>Doctors</h1>
                  <span className="text-8xl text-gray-700 font-semibold text-center w-full block">{data?.doctors}</span>
                </div>
              </div>
          </div>

          <div>
            <UserList isUbmenu={true} />
          </div>
          
        </div>
      )}
    </>
  );
}
