import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () =>{
    dispatch(logout())
    navigate("/")
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <header className="shadow sticky top-0 bg-white z-50">
      <nav className="max-w-[100rem] mx-auto py-4 px-[5%] flex items-center justify-between">
        <NavLink to={`/`} className="w-fit">
          <h1 className="md:text-3xl sm:text-2xl text-xl font-semibold uppercase roboto">
            Employwise
          </h1>
        </NavLink>
        <button
          onClick={handleLogout}
          className="bg-gray-800 sm:px-6 px-3 sm:py-4 py-2 rounded-md text-white font-semibold sm:text-base text-sm"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
