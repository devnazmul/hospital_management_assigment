// ===========================================
// #00106
// ===========================================

import { AiFillCrown, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiAutoRepair } from 'react-icons/gi';
import { MdEditDocument, MdOutlineCategory, MdOutlinePayment, MdPeopleOutline, MdPointOfSale } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { TbFileInvoice } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

const sidebarLinks = [
  {
    route: '/',
    Icon: RxDashboard,
    title: 'Dashboard',
  },
  {
    route: '/landlord',
    Icon: AiFillCrown,
    title: 'Landlord',
  },
  {
    route: '/tenant',
    Icon: MdPeopleOutline,
    title: 'Tenant',
  },
  {
    route: '/property',
    Icon: BiBuildingHouse,
    title: 'Property',
  },
  {
    route: '/repair-item-category',
    Icon: MdOutlineCategory,
    title: `Repair Category`,
  },
  {
    route: '/repair-item',
    Icon: GiAutoRepair,
    title: 'Repair Item',
  },
  {
    route: '/sale-item',
    Icon: MdPointOfSale,
    title: 'Sale Item',
  },
  {
    route: '/payment-form',
    Icon: MdOutlinePayment,
    title: 'Payment',
  },
  {
    route: '/invoice-form',
    Icon: AiOutlinePlusCircle,
    title: 'Create Invoice',
  },
  {
    route: '/pending-invoce-form',
    Icon: TbFileInvoice,
    title: 'Pending Invoice Reminder',
  },
  {
    route: '/all-recipt',
    Icon: MdEditDocument,
    title: 'Create Receipt',
  }
  
];

export default function AdminLayoutSidebar() {
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
