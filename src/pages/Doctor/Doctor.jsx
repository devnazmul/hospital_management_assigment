import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getUserByRole } from '../../apis/auth/auth';
import CustomLoading from '../../components/CustomLoading';
import CustomToaster from '../../components/CustomToaster';
import DoctorCard from '../../components/DoctorCard';
import Navbar from '../../layout/Navbar/Navbar';

export default function Doctor() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserByRole('doctor')
      .then((res) => {
        console.log(res?.data);
        setData(
          res?.data.map((doctor) => ({
            id: doctor?._id,
            name: doctor?.name,
            email: doctor?.email,
            role: doctor?.role,
            profile: doctor?.profile_pic_url
            ,
          }))
        );
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
  }, []);
  return (
    <>
      <nav className={``}>
        <Navbar title={`Doctors`} />
      </nav>
      <div className="w-full h-[85vh] md:h-[75vh] overflow-y-auto scrollbar px-10 py-10">
        {isLoading ? (
          <CustomLoading />
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((doctor, index) => (
              <DoctorCard key={index} data={doctor} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
