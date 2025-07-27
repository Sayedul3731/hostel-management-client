import { useEffect } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers, FaUtensils } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdFoodBank, MdRateReview } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";


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
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100 w-full text-black">
            {/* Sidebar */}
            <aside className="w-full md:w-2/12 md:min-h-screen px-2 md:px-5 bg-blue-50/80 border-r border-blue-100 sticky top-0 z-20 flex-shrink-0">
                <nav className="py-10 flex flex-col h-full">
                    <ul className="space-y-2 mt-10 md:mt-32">
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/Dashboard/AdminProfile"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <CgProfile size={20} /> Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/ManageUsers"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <FaUsers size={20} /> Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/AddMeal"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <GiMeal size={20} /> Add Meal
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/AllMeals"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <FaUtensils size={20} /> All Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/AllReviews"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <MdRateReview size={20} /> All Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/ServeMeals"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <MdFoodBank size={20} /> Serve Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/UpcomingMeals"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <BiSolidFoodMenu size={20} /> Upcoming Meals
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to="/Dashboard/MyProfile"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <CgProfile size={20} /> My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/RequestedMeals"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <GiMeal size={20} /> Request Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dashboard/MyReviews"
                                        className={({ isActive }) =>
                                            `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                        }
                                    >
                                        <MdRateReview size={20} /> My Reviews
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="my-6 border-t border-blue-100"></div>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`
                                }
                            >
                                <FaHome size={20} /> Home
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 w-full md:w-10/12 px-2 md:px-10 py-6 md:py-10 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;