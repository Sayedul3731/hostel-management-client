// import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import NotificationsIcon from '@mui/icons-material/Notifications';
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {

  const { logOut, user } = useContext(AuthContext)
  const [isAdmin] = useAdmin();

  const navLinks = (
    <>
      <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mr-4 underline" : "lg:text-md lg:font-medium md:font-medium mr-6"} to="/" >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mr-6 underline" : "lg:text-md lg:font-medium md:font-medium mr-6"} to="/Meals">
          Meals
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mr-6 underline" : "lg:text-md lg:font-medium md:font-medium mr-6"} to="/categoriesMeals">
          Categories Meals
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mr-6 underline" : "lg:text-md lg:font-medium md:font-medium mr-6"} to="/UpcomingMeals">
          Upcoming Meals
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mr-6 underline" : "lg:text-md lg:font-medium md:font-medium mr-6"} to="/Rooms">
          Rooms
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mr-6 underline" : "lg:text-md lg:font-medium md:font-medium mr-6"} to="/NoticeBoard">
          Notice Board
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mr-6 underline" : "lg:text-md lg:font-medium md:font-medium mr-6"} to="/FAQ">
          FAQ
        </NavLink>
      </li>
      <li>
        <div>
          <NotificationsIcon></NotificationsIcon>
        </div>
      </li>
      {
        user ? ' ' : <li>
          <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-md lg:font-medium md:font-medium mx-2 underline" : "lg:text-md lg:font-medium md:font-medium mx-2"} to="/Login">
            Join Us
          </NavLink>
        </li>
      }
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log out successfully!",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch()
  }

  return (
    <div className="bg-primary-300 sticky -top-1 z-30 py-2 text-white">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div>
            <img className="w-16 h-12 hidden lg:flex" src="logoo.png" alt="" />
          </div>
          <div className="dropdown">
            <label tabIndex={0} className=" lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black text-white rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className=" normal-case text-xl font-bold pl-3 lg:pl-1">
            HappyHostel
          </a>
        </div>
        <div className="navbar-center  hidden lg:flex">
          <ul className="flex px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0}>{
              user ? <img className="w-[50px] h-[50px] rounded-full cursor-pointer" src={user?.photoURL} alt="" /> : ''
            }</label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-black text-white rounded-box w-52">
              <li>{user?.displayName}</li>
              <Link to={isAdmin ? "/dashboard/adminProfile" : "/dashboard/myProfile"}><li className="my-2">Dashboard</li></Link>
              <li onClick={handleLogOut} className="cursor-pointer">LogOut</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;