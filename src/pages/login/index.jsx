import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { GiCheckMark } from "react-icons/gi";
import { login } from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../app/features/authSlice";
import { MdError } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const passRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast(
        <p className="flex items-center">
          <MdError className="w-5 h-5 mr-3" />
          Email is required!!
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
          <MdError className="w-5 h-5 mr-3" />
          Invalid email format!!
        </p>, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        className: "bg-red-600 text-white font-semibold shadow-md",
      });
      return;
    }

    if (!password) {
      toast(
        <p className="flex items-center">
          <MdError className="w-5 h-5 mr-3" />
          Password is required!!
        </p>, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        className: "bg-red-600 text-white font-semibold shadow-md",
      });
      return;
    }
    const res = await login({ email, password });
    if (res) {
      dispatch(loginSuccess(res.data.token));
      toast(
        <p className="flex items-center">
          <GiCheckMark className="mr-3" />
          Login Successful!!
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
      navigate("/users");
    } else {
      toast(
        <p className="flex items-center">
          <FaXmark className="mr-3" />
          Login Failed!!
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
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/users");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="hidden lg:block lg:w-1/2 h-screen img px-14 py-10">
        <NavLink to={`/`} className="w-fit">
          <h1 className="text-3xl font-semibold uppercase text-white roboto">
            Employwise
          </h1>
        </NavLink>
      </div>
      <div className="lg:w-1/2 w-full min-h-screen p-[5%] flex flex-col justify-center items-center relative">
        <h1 className="lg:hidden text-2xl font-semibold uppercase roboto absolute top-10 left-[5%]">
          Employwise
        </h1>
        <div className="lg:max-w-lg md:max-w-sm sm:max-w-xs w-full">
          <h2 className="text-lg font-bold mb-10 text-left w-full uppercase">
            Login
          </h2>
          <form className="">
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
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2.5 px-3 border border-gray-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                ref={passRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(e) => {
                  setShowPass(!showPass);
                  e.preventDefault();
                }}
                className="grid place-items-center absolute right-2 bottom-0 w-10 h-10 cursor-pointer"
              >
                <FaEye
                  className={
                    showPass ? `hidden` : `block` + ` absolute w-5 h-5`
                  }
                />
                <FaEyeSlash
                  className={
                    showPass ? `block` : `hidden` + ` absolute w-5 h-5`
                  }
                />
              </button>
            </div>
            <div className="flex flex-col gap-5 mb-3">
              <button
                className="py-3.5 px-10 font-semibold uppercase border text-white bg-gray-800 border-gray-800 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="py-3.5 px-10 font-semibold uppercase border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Login with Google
              </button>
            </div>
          </form>
        </div>
        <NavLink
          to="/"
          className="text-sm text-gray-700 hover:text-gray-900 text-left lg:max-w-lg md:max-w-sm sm:max-w-xs w-full"
        >
          Forgot Password?
        </NavLink>
      </div>
    </div>
  );
};

export { Login };
