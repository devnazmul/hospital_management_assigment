// ===========================================
// #00105
// ===========================================

import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiEnvelopeOpen } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { GoBellFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteNotification,
  getAllsNotification,
  markAsReadNotification,
} from "../../apis/notification/notification";
import CustomToaster from "../../components/CustomToaster";
import { AuthContext } from "../../context/AuthContext";

const AssistantSidebarLinks = [
  {
    route: "/",
    Icon: AiOutlineDashboard,
    title: "Dashboard",
  },
];
const DoctorSidebarLinks = [
  {
    route: "/",
    Icon: AiOutlineDashboard,
    title: "Dashboard",
  },
];
const PatientSidebarLinks = [
  {
    route: "/",
    Icon: AiOutlineDashboard,
    title: "Dashboard",
  },
];

export default function Navbar({ title }) {
  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);
  const [initialClass, setInitialClass] = useState("-right-[500px] hidden");
  const location = useLocation();

  const navigate = useNavigate();
  const { setLogout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("userData"));

  const [isUpdated, setIsUpdated] = useState(Math.random());

  const handleToggle = () => {
    setInitialClass(
      initialClass === "-right-[500px] hidden"
        ? "right-0 flex"
        : "-right-[500px] hidden"
    );
  };

  const handleLogout = () => {
    setLogout();
  };
  const [notiOpen, setNotiOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getAllsNotification().then((res) => {
      setNotifications(res?.data.reverse());
    });
    setNotiOpen(false);
  }, [location.pathname, isUpdated]);

  const handleMarkAsRead = (id) => {
    console.log(id);
    markAsReadNotification(id)
      .then((res) => {
        setIsUpdated(Math.random());
      })
      .catch((error) => {
        console.log(error);
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"error"}
            text={`ID: #00108 - ${error?.response?.data?.message}`}
          />
        ));
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteNotification(id)
      .then((res) => {
        setIsUpdated(Math.random());
      })
      .catch((error) => {
        console.log(error);

        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"error"}
            text={`ID: #00108 - ${error?.response?.data?.message}`}
          />
        ));
      });
  };
  return (
    <div
      className={` flex justify-between items-center gap-10 py-3 px-4 md:px-7 shadow-lg relative bg-base-100 border-neutral`}
    >
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>
      <div className="w-11/12 md:w-full flex justify-end items-center gap-10">
        {user && (
          <div className={`relative`}>
            <div
              onClick={() => setIsUserDropdownOpened(!isUserDropdownOpened)}
              className="avatar placeholder cursor-pointer"
            >
              <div className="bg-primary rounded-full w-12">
                <img
                  className="h-12 w-12 object-cover"
                  src={user?.profile_pic_url}
                  alt=""
                />
              </div>
            </div>
            <div
              className={`${
                isUserDropdownOpened ? "flex" : "hidden"
              } absolute p-2 bg-base-100 shadow-lg right-0 w-72 z-50 -bottom-[7.3rem] border rounded-xl flex-col justify-between`}
            >
              <ul className="w-full">
                <span className="w-full block text-primary px-5 py-2 rounded-lg text-center font-medium text-xl">
                  {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}{" "}
                </span>
                {/* <li className=" w-full group hover:bg-primary px-5 py-2 rounded-lg cursor-pointer flex items-center gap-2">
                  <BsPerson className="text-primary group-hover:text-base-100" />
                  <span className="text-primary group-hover:text-base-100">
                    Profile
                  </span>
                </li> */}
              </ul>
              <div>
                <button
                  onClick={handleLogout}
                  className="w-full hover:bg-error px-5 py-2 rounded-lg cursor-pointer text-error hover:text-base-100 flex items-center gap-2"
                >
                  <CiLogout />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
