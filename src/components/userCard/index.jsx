import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { deleteUser, editUser } from "../../api/apiCalls";
import { toast } from "react-toastify";
import { GiCheckMark } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";

const UserCard = ({ user, onRefresh }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const handleDelete = () => {
    deleteUser(user.id)
      .then((response) => {
        // console.log(response);
        toast(
          <p className="flex items-center">
            <GiCheckMark className="mr-3" />
            User deleted successfully!!
          </p>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            className: "bg-green-600 text-white font-semibold shadow-md",
          }
        );
        onRefresh();
      })
      .catch((error) => {
        toast(
          <p className="flex items-center">
            <FaXmark className="mr-3" />
            unable to delete user. Try Later!!
          </p>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            className: "bg-red-600 text-white font-semibold shadow-md",
          }
        );
        console.error(error);
      });
    setDeleteModalOpen(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      toast(
        <p className="flex items-center">
          <FaXmark className="mr-3" />
          All fields are required!!
        </p>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          className: "bg-red-600 text-white font-semibold shadow-md",
        }
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast(
        <p className="flex items-center">
          <FaXmark className="mr-3" />
          Invalid email format!!
        </p>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          className: "bg-red-600 text-white font-semibold shadow-md",
        }
      );
      return;
    }
    const body = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    editUser(user.id, body)
      .then((response) => {
        toast(
          <p className="flex items-center">
            <GiCheckMark className="mr-3" />
            User edited successfully!!
          </p>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            className: "bg-green-600 text-white font-semibold shadow-md",
          }
        );
        onRefresh();
      })
      .catch((error) => {
        toast(
          <p className="flex items-center">
            <FaXmark className="mr-3" />
            unable to edit user. Try Later!!
          </p>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            className: "bg-red-600 text-white font-semibold shadow-md",
          }
        );
        console.error(error);
      });

    setEditModalOpen(false);
  };

  return (
    <>
      <div className="card shadow rounded-lg p-5 flex lg:flex-row flex-col items-center hover:bg-gray-800/5 ease-in-out transition-all duration-300 cursor-pointer relative">
        <div className="avatar rounded-md overflow-hidden lg:w-28 w-36 lg:h-28 h-36 lg:mb-0 mb-5">
          <img src={user.avatar} alt="" className="w-full h-full" />
        </div>
        <div className="content lg:ml-5 lg:w-auto w-full">
          <h3 className="font-semibold text-xl lg:text-left text-center">
            {user.first_name} {user.last_name}
          </h3>
          <p className="flex items-center lg:justify-start justify-center text-sm font-medium mb-5">
            <IoMdMail className="mr-2" /> {user.email}
          </p>
          <div className="flex lg:justify-start justify-center">
            <button
              className="mx-1 rounded-lg text-gray-800/80 border border-gray-800/30 flex items-center px-4 py-1.5 font-medium hover:text-white hover:bg-gray-800 ease-in-out transition-all duration-150 text-sm"
              onClick={() => setEditModalOpen(true)}
            >
              <MdEdit className="w-[1.12rem] h-[1.12rem] mr-1.5" /> Edit
            </button>
            <button
              className="mx-1 rounded-lg text-gray-800/80 border border-gray-800/30 flex items-center px-4 py-1.5 font-medium hover:text-white hover:bg-gray-800 ease-in-out transition-all duration-150 text-sm"
              onClick={() => setDeleteModalOpen(true)}
            >
              <FaTrashAlt className="w-4.5 h-4.5 mr-1.5" /> Delete
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="backdrop-blur-sm fixed z-50 w-full left-0 top-0 min-h-screen flex items-center justify-center bg-gray-800/20">
          <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow">
            <p className="mb-10 font-semibold">
              Are you sure you want to delete this user?
            </p>
            <div className="flex gap-5">
              <button
                className="py-3 w-1/2 font-semibold uppercase border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="py-3 w-1/2 font-semibold uppercase border text-white bg-gray-800 border-gray-800 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="backdrop-blur-sm fixed z-50 w-full left-0 top-0 min-h-screen flex items-center justify-center bg-gray-800/20">
          <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow">
            <form>
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2.5 px-3 border border-gray-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2.5 px-3 border border-gray-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2.5 px-3 border border-gray-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex gap-5 mb-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditModalOpen(false);
                  }}
                  className="py-3 w-1/2 font-semibold uppercase border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  className="py-3 w-1/2 font-semibold uppercase border text-white bg-gray-800 border-gray-800 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export { UserCard };
