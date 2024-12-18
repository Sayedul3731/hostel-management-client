import { FaHome, FaUsers, FaUtensils } from "react-icons/fa";
import { GiMeal } from "react-icons/gi"
import { CgProfile } from "react-icons/cg";
import { MdFoodBank, MdRateReview } from "react-icons/md"
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import useAdmin from "../../hooks/useAdmin";
import { useEffect } from "react"


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname == '/') {
            document.title = 'HappyHostel | Home'
        }
        else {
            document.title = `HappyHostel | Dashboard ${location.pathname.replace('/Dashboard/', '| ')}`
        }
    }, [location.pathname])


    return (
        <div className="flex flex-col md:flex-row bg-white w-full text-black">
            <div className="w-full md:w-2/12 md:min-h-screen px-5 bg-blue-50">
                <ul className="mt-32 ">
                    {isAdmin ? (
                        <ul className="space-y-2 ">
                            <li>
                                <NavLink
                                    to="/Dashboard/AdminProfile"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-1 rounded flex justify-start items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <CgProfile /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/ManageUsers"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-1 rounded flex  items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <FaUsers /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/AddMeal"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-1 rounded flex  items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <GiMeal /> Add Meal
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/AllMeals"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-1 rounded flex  items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <FaUtensils /> All Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/AllReviews"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-1 rounded flex  items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <MdRateReview /> All Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/ServeMeals"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-1 rounded flex  items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <MdFoodBank /> Serve Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/UpcomingMeals"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-1 rounded flex  items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <BiSolidFoodMenu /> Upcoming Meals
                                </NavLink>
                            </li>
                        </ul>
                    ) : (
                        <ul className="space-y-3">
                            <li>
                                <NavLink
                                    to="/Dashboard/MyProfile"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <CgProfile /> My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/RequestedMeals"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <GiMeal /> Request Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Dashboard/MyReviews"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : ''}`
                                    }
                                >
                                    <MdRateReview /> My Reviews
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </ul>

                <div className="divider"></div>
                <>
                    <ul className="">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `font-semibold px-4 py-1 rounded flex  items-center gap-1 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                }
                            >
                                <FaHome /> Home
                            </NavLink>
                        </li>
                    </ul>
                </>
            </div>
            <div className=" md:w-9/12 m-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;