// ===========================================
// #00153
// ===========================================

import { MdBusiness, MdPeopleOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const sidebarLinks = [
   {
      route: '/',
    Icon: MdPeopleOutline,
    title: 'Users',
  }
];

export default function SuperAdminLayoutSidebar() {
  return (
    <div
      className={`h-full bg-primary w-full text-base-100 flex flex-col px-1 py-5 `}>
      <div className={`logo w-full flex justify-center items-center`}>
        <img
          className={`w-[50%] hidden md:block`}
          src="/assets/logo.png"
          alt=""
        />
        <img
          className={`w-[50%] block md:hidden`}
          src="/assets/responsive-logo.png"
          alt=""
        />
      </div>
      <div className={`navmenu flex flex-col gap-5 mt-2 items-center md:items-start md:px-5 overflow-y-auto scrollbar`}>
        {sidebarLinks.map((lnk, i) => {
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
                <Icon  className={`icon text-2xl`} />
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
