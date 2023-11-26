import { FaHome, FaUsers, FaUtensils } from "react-icons/fa";
import { GiMeal } from "react-icons/gi"
import { CgProfile } from "react-icons/cg";
import { MdFoodBank, MdRateReview } from "react-icons/md"
import { NavLink, Outlet } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 md:min-h-screen bg-green-500">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminProfile"><CgProfile></CgProfile>Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers"><FaUsers></FaUsers> Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addMeal"><GiMeal></GiMeal>Add Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allMeals"><FaUtensils></FaUtensils> All Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allReviews"><MdRateReview /> All Reviews</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/serveMeals"><MdFoodBank /> Serve Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/upcomingMeals"><BiSolidFoodMenu /> Upcoming Meals</NavLink>
                            </li>
                        </>
                            : <>
                                <li>
                                    <NavLink to="/dashboard/myProfile"><CgProfile></CgProfile>My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requestedMeals"><GiMeal></GiMeal>Request Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myReviews"><MdRateReview /> My Reviews</NavLink>
                                </li>
                            </>
                    }
                </ul>
                <div className="divider"></div>
                <>
                    <ul className="menu">
                        <li>
                            <NavLink to="/"><FaHome /> Home</NavLink>
                        </li>
                    </ul>
                </>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;