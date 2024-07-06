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
      className={`flex justify-between items-center gap-10 py-3 px-4 md:px-7 shadow-lg relative bg-base-100 border-neutral`}
    >
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>
      <div className="w-11/12 md:w-full flex justify-end items-center gap-10">
        <div className="relative w-10 h-10">
          <div
            onClick={() => setNotiOpen(!notiOpen)}
            className="w-10 h-10 rounded-xl bg-primary bg-opacity-20 text-primary cursor-pointer text-xl flex justify-center items-center "
          >
            {notifications.filter((n) => n.status === "unread").length > 0 && (
              <span className="absolute w-3 h-3 rounded-full bg-green-600 top-0 right-0"></span>
            )}
            <GoBellFill />
          </div>
          {notiOpen && (
            <div className="absolute border shadow-xl z-50 overflow-hidden -right-10 top-[60px] rounded-xl bg-base-100 h-[400px] w-[300px] overflow-y-auto scrollbar">
              <ul className="h-full">
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((noti, i) => (
                      <li
                        key={i}
                        className={`flex cursor-pointer border-b py-2 hover:bg-primary duration-150 group px-5 flex-col w-full items-start justify-center ${
                          noti.status === "unread"
                            ? "bg-blue-100"
                            : "bg-baase-100"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-primary group-hover:text-base-100 text-md font-semibold">
                            {noti?.title}
                          </span>
                          <div className="flex gap-2">
                            {noti.status === "unread" && (
                              <button
                                title="mark as read"
                                className="hover:text-green-200"
                                onClick={() => handleMarkAsRead(noti._id)}
                              >
                                <BiEnvelopeOpen className="text-xl" />
                              </button>
                            )}
                            <button
                              className="hover:text-red-600"
                              onClick={() => handleDelete(noti._id)}
                            >
                              <MdDelete className="text-xl" />
                            </button>
                          </div>
                        </div>
                        <p className=" text-sm text-gray-800">
                          {noti?.message}
                        </p>
                      </li>
                    ))}
                  </>
                ) : (
                  <li className="h-full flex justify-center items-center text-2xl text-gray-400 font-semibold">
                    Empty!
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

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
              } absolute p-2 bg-base-100 shadow-lg right-0 w-72 z-50 -bottom-40 border rounded-xl flex-col justify-between`}
            >
              <ul className="w-full">
                <span className="w-full block text-primary px-5 py-2 rounded-lg text-center font-medium text-xl">
                  {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}{" "}
                </span>
                <li className=" w-full group hover:bg-primary px-5 py-2 rounded-lg cursor-pointer flex items-center gap-2">
                  <BsPerson className="text-primary group-hover:text-base-100" />
                  <span className="text-primary group-hover:text-base-100">
                    Profile
                  </span>
                </li>
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
