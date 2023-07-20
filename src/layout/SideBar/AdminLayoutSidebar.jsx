// ===========================================
// #00106
// ===========================================

import { AiOutlineDashboard } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const AssistantSidebarLinks = [
  {
    route: '/',
    Icon: AiOutlineDashboard,
    title: 'Dashboard',
  },
  {
    route: '/appointment',
    Icon: AiOutlineDashboard,
    title: 'Appointments',
  },
  {
    route: '/user/doctor',
    Icon: AiOutlineDashboard,
    title: 'Doctors',
  },
  {
    route: '/user/patient',
    Icon: AiOutlineDashboard,
    title: 'Patients',
  },
];


const DoctorSidebarLinks = [
  {
    route: '/',
    Icon: AiOutlineDashboard,
    title: 'Appointments',
  },
  
];


const PatientSidebarLinks = [
  {
    route: '/',
    Icon: AiOutlineDashboard,
    title: 'Appointments',
  },
  
];

export default function AdminLayoutSidebar() {
  const user = JSON.parse(localStorage.getItem('userData'));
  return (
    <div
      className={`h-full bg-primary w-full text-base-100 flex flex-col px-1 py-5 `}>
      <div className={`logo w-full flex justify-center items-center`}>
        <h1 className='text-xl font-bold mb-10'>Khan Hospital</h1>
      </div>
      <div
        className={`navmenu flex flex-col gap-5 mt-2 items-center md:items-start md:px-5 overflow-y-auto scrollbar`}>
        {/* ASSISTANT SIDE BAR  */}
        {user?.role === 'assistant' &&
          AssistantSidebarLinks.map((lnk, i) => {
            const { title, route, Icon } = lnk;
            return (
              <NavLink
                title={title}
                key={i}
                to={route}
                className={({ isActive }) =>
                  isActive
                    ? `py-2 w-full activeNavLink flex justify-center md:justify-start items-center gap-5 text-base-100 font-semibold border-b-2 border-secondary hover:translate-x-3  transition-all duration-150`
                    : `py-2 w-full hover:translate-x-3 transition-all duration-150 flex justify-center md:justify-start items-center gap-5`
                }>
                <span className={`inline-block w-[20px]`}>
                  <Icon className={`icon text-2xl`} />
                </span>
                <span
                  className={`text-sm  hidden md:block group-hover:border-t-2 border-secondary`}>
                  {title}
                </span>
              </NavLink>
            );
          })}

        {/* DOCTOR SIDE BAR  */}
        {user?.role === 'doctor' &&
          DoctorSidebarLinks.map((lnk, i) => {
            const { title, route, Icon } = lnk;
            return (
              <NavLink
                title={title}
                key={i}
                to={route}
                className={({ isActive }) =>
                  isActive
                    ? `py-2 w-full activeNavLink flex justify-center md:justify-start items-center gap-5 text-base-100 font-semibold border-b-2 border-secondary hover:translate-x-3  transition-all duration-150`
                    : `py-2 w-full hover:translate-x-3 transition-all duration-150 flex justify-center md:justify-start items-center gap-5`
                }>
                <span className={`inline-block w-[20px]`}>
                  <Icon className={`icon text-2xl`} />
                </span>
                <span
                  className={`text-sm  hidden md:block group-hover:border-t-2 border-secondary`}>
                  {title}
                </span>
              </NavLink>
            );
          })}

        {/* PATIENT SIDEBAR  */}
        {user?.role === 'patient' &&
          PatientSidebarLinks.map((lnk, i) => {
            const { title, route, Icon } = lnk;
            return (
              <NavLink
                title={title}
                key={i}
                to={route}
                className={({ isActive }) =>
                  isActive
                    ? `py-2 w-full activeNavLink flex justify-center md:justify-start items-center gap-5 text-base-100 font-semibold border-b-2 border-secondary hover:translate-x-3  transition-all duration-150`
                    : `py-2 w-full hover:translate-x-3 transition-all duration-150 flex justify-center md:justify-start items-center gap-5`
                }>
                <span className={`inline-block w-[20px]`}>
                  <Icon className={`icon text-2xl`} />
                </span>
                <span
                  className={`text-sm  hidden md:block group-hover:border-t-2 border-secondary`}>
                  {title}
                </span>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}
