// ===========================================
// #00108
// ===========================================

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteAppointment } from "../../apis/appointment/appointment";
import { getUserByRole } from "../../apis/auth/auth";
import CustomToaster from "../../components/CustomToaster";
import Table from "../../components/Table";
import Navbar from "../../layout/Navbar/Navbar";

export default function UserList({ isNeedNav = true }) {
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // API RELATED
  const [totalData, setTotalData] = useState(0);

  // IS ANY CHANGE ON TABLE
  const [isUpdated, setIsUpdated] = useState(Math.random());

  useEffect(() => {
    setIsLoading(true);
    getUserByRole("patient")
      .then((res) => {
        console.log(res);
        setData(
          res?.data.map((doctor) => ({
            id: doctor?._id,
            name: doctor?.name,
            email: doctor?.email,
            role: (
              <span className="px-3 py-2 rounded-xl bg-pink-700 bg-opacity-20 text-pink-700">{`${doctor?.role
                .charAt(0)
                .toUpperCase()}${doctor.role.slice(1).toLowerCase()}`}</span>
            ),
            profile: (
              <img
                className="w-12 h-12 object-cover rounded-xl"
                src={doctor?.profile_pic_url}
                alt=""
              />
            ),
          }))
        );
        setTotalData(res?.total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"error"}
            text={`ID: #00108 - ${error?.response?.data?.message}`}
          />
        ));
      });
  }, [isUpdated]);

  // // HANDLE DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAppointment(id)
          .then((res) => {
            if (res) {
              setIsUpdated(false);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          });
      }
    });
  };

  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const closeModal = () => setAddPopup(false);

  return (
    <>
      <nav className={``}>{isNeedNav ? <Navbar title={`Patients`} /> : ""}</nav>
      <div className="w-full h-[85vh] md:h-[75vh] overflow-y-auto scrollbar px-10 py-10">
        <div>
          <Table
            rows={data}
            cols={["profile", "name", "email", "role"]}
            isLoading={isLoading}
            handleView={() => {}}
            handleEdit={(e) => {
              setSelectedId(e);
              editPopup(true);
            }}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
