// ===========================================
// #00106
// ===========================================

import { AiOutlineInfoCircle, AiOutlineSetting } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { LuCalendarHeart, LuHelpingHand } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { TbCheckupList } from "react-icons/tb";

const AssistantSidebarLinks = [
  {
    route: "/",
    Icon: RxDashboard,
    title: "Dashboard",
  },
  {
    route: "/appointment",
    Icon: TbCheckupList,
    title: "Appointments",
  },
  {
    route: "/doctor",
    Icon: FaUserDoctor,
    title: "Doctors",
  },
  {
    route: "/user",
    Icon: LuHelpingHand,
    title: "Patients",
  },
];

const DoctorSidebarLinks = [
  {
    route: "/",
    Icon: TbCheckupList,
    title: "Appointments",
  },
  {
    route: "/schedule",
    Icon: LuCalendarHeart,
    title: "Schedule",
  },
];

const PatientSidebarLinks = [
  {
    route: "/",
    Icon: TbCheckupList,
    title: "Appointments",
  },
];

export default function AdminLayoutSidebar() {
  const user = JSON.parse(localStorage.getItem("userData"));
  return (
    <div
      className={`z-20 h-full bg-primary group w-20 rounded-lg text-base-100 flex flex-col justify-between px-1 py-5`}
    >
      <div className={`logo w-full flex justify-center items-center`}>
        <img className="w-10 h-10" src="/assets/responsive-logo.png" alt="" />
      </div>
      <div
        className={`navmenu flex flex-col gap-5 mt-2 items-center md:items-start px-4 overflow-y-auto scrollbar`}
      >
        {/* ASSISTANT SIDE BAR  */}
        {user?.role === "assistant" &&
          AssistantSidebarLinks.map((lnk, i) => {
            const { title, route, Icon } = lnk;
            return (
              <NavLink
                title={title}
                key={i}
                to={route}
                className={({ isActive }) =>
                  isActive
                    ? `h-10 w-10 bg-blue-300 flex justify-center items-center rounded-xl`
                    : `h-10 w-10 hover:bg-blue-800 flex justify-center items-center rounded-xl`
                }
              >
                <span className={``}>
                  <Icon className={`icon text-2xl text-base-100`} />
                </span>
                <span className={`text-sm  hidden hover:block `}>{title}</span>
              </NavLink>
            );
          })}

        {/* DOCTOR SIDE BAR  */}
        {user?.role === "doctor" &&
          DoctorSidebarLinks.map((lnk, i) => {
            const { title, route, Icon } = lnk;
            return (
              <NavLink
                title={title}
                key={i}
                to={route}
                className={({ isActive }) =>
                  isActive
                    ? `h-10 w-10 bg-blue-300 flex justify-center items-center rounded-xl`
                    : `h-10 w-10 hover:bg-blue-800 flex justify-center items-center rounded-xl`
                }
              >
                <span className={``}>
                  <Icon className={`icon text-2xl text-base-100`} />
                </span>
                <span className={`text-sm  hidden hover:block `}>{title}</span>
              </NavLink>
            );
          })}

        {/* PATIENT SIDEBAR  */}
        {user?.role === "patient" &&
          PatientSidebarLinks.map((lnk, i) => {
            const { title, route, Icon } = lnk;
            return (
              <NavLink
                title={title}
                key={i}
                to={route}
                className={({ isActive }) =>
                  isActive
                    ? `h-10 w-10 bg-blue-300 flex justify-center items-center rounded-xl`
                    : `h-10 w-10 hover:bg-blue-800 flex justify-center items-center rounded-xl`
                }
              >
                <span className={``}>
                  <Icon className={`icon text-2xl text-base-100`} />
                </span>
                <span className={`text-sm  hidden hover:block `}>{title}</span>
              </NavLink>
            );
          })}
      </div>

      <div
        className={`navmenu flex flex-col gap-5 mt-2 items-center md:items-start md:px-5 overflow-y-auto scrollbar`}
      ></div>
    </div>
  );
}
