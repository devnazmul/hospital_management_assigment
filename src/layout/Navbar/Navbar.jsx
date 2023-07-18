// ===========================================
// #00105
// ===========================================

import { useContext, useState } from 'react';
import { AiFillCrown, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiBuildingHouse } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { GiAutoRepair } from 'react-icons/gi';
import {
  MdAddCircleOutline,
  MdEditDocument, MdOutlineCategory, MdOutlinePayment,
  MdPeopleOutline, MdPointOfSale
} from 'react-icons/md';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { TbFileInvoice } from 'react-icons/tb';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const sidebarLinks = [
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
    route: '/create-recipt',
    Icon: MdEditDocument,
    title: 'Create Receipt',
  }
];

export default function Navbar() {
  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);
  const [initialClass, setInitialClass] = useState('-right-[500px] hidden');

  const navigate = useNavigate();
  const { setLogout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('userData'));

  const handleToggle = () => {
    setInitialClass(
      initialClass === '-right-[500px] hidden'
        ? 'right-0 flex'
        : '-right-[500px] hidden'
    );
  };

  const handleLogout = () => {
    setLogout();
  };

  return (
    <div
      className={`flex justify-between items-center gap-10 py-5 px-7 shadow-lg relative bg-base-100 border-b border-neutral`}>
      <div className="w-1/12 block md:hidden">
        <img
          className="w-12 h-12 object-contain"
          src="/assets/responsive-logo.png"
          alt=""
        />
      </div>
      <div className="w-11/12 md:w-full flex justify-end items-center gap-10">
        <NavLink to={'/invoice-form'}>
          <button
            title="Add Invoice"
            className={
              'btn btn-primary rounded-full btn-outline hover:text-blue group text-primary'
            }>
            <MdAddCircleOutline className="text-3xl md:text-xl" />{' '}
            <span className=" md:block hidden group-hover:text-blue">Add Invoice</span>
          </button>
        </NavLink>
        {user && (
          <div className={`relative`}>
            <div
              onClick={() => setIsUserDropdownOpened(!isUserDropdownOpened)}
              className="avatar placeholder cursor-pointer">
              <div className="bg-primary rounded-full w-12">
                <span className="text-neutral">
                  {user?.first_Name.split('')[0].toUpperCase()}
                  {user?.last_Name &&
                    user?.last_Name.split('')[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div
              className={`${
                isUserDropdownOpened ? 'flex' : 'hidden'
              } absolute p-2 bg-primary shadow-lg right-0 w-72 z-50 -bottom-40 border rounded-xl flex-col justify-between`}>
              <ul className="w-full">
                <span className="w-full block text-base-100 px-5 py-2 rounded-lg text-center font-medium text-xl">
                  {user?.first_Name.charAt(0).toUpperCase() +
                    user?.first_Name.slice(1)}{' '}
                  {user?.last_Name.charAt(0).toUpperCase() +
                    user?.last_Name.slice(1)}
                </span>
                <li className=" w-full group hover:bg-base-100 px-5 py-2 rounded-lg cursor-pointer flex items-center gap-2">
                  <BsPerson className='text-base-100 group-hover:text-primary' /> 
                  <span className='text-base-100 group-hover:text-primary'>Profile</span>
                </li>
              </ul>
              <div>
                <button
                  onClick={handleLogout}
                  className="w-full hover:bg-error px-5 py-2 rounded-lg cursor-pointer text-error hover:text-primary flex items-center gap-2">
                  <CiLogout />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        <button onClick={handleToggle} className="block md:hidden">
          {initialClass !== '-right-[500px] hidden' ? (
            <RxCross1 className={`text-3xl text-secondary`} />
          ) : (
            <RxHamburgerMenu className={`text-3xl text-primary`} />
          )}
        </button>
      </div>
      <div
        className={` md:hidden transition-all duration-200 absolute flex-col gap-5 px-5 py-5 z-[1000000] bg-primary shadow-lg  top-[90px] ${initialClass} w-[250px] h-[90vh] overflow-y-auto scrollbar`}>
        {sidebarLinks.map((lnk, i) => {
          const { title, route, Icon } = lnk;
          return (
            <NavLink
              title={title}
              key={i}
              to={route}
              className={({ isActive }) =>
                isActive
                  ? `py-2 w-full activeNavLink flex text-base-100 justify-start md:justify-start items-center gap-5 font-semibold border-b-2 border-secondary hover:translate-x-3  transition-all duration-150`
                  : `py-2 w-full hover:translate-x-3 text-base-100 transition-all duration-150 flex justify-start md:justify-start items-center gap-5`
              }>
              <span className={`inline-block w-[20px]`}>
                <Icon className={`icon text-2xl`} />
              </span>
              <span
                className={`text-sm block group-hover:border-t-2 border-secondary`}>
                {title}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
