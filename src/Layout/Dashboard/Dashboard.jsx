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
        console.log(location.pathname);
        if (location.pathname == '/') {
            document.title = 'HappyHostel | Home'
        }
        else {
            document.title = `HappyHostel | Dashboard ${location.pathname.replace('/Dashboard/', '| ')}`
        }
    }, [location.pathname])


    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 md:min-h-screen bg-green-500">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/Dashboard/AdminProfile"><CgProfile></CgProfile>Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/ManageUsers"><FaUsers></FaUsers> Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/AddMeal"><GiMeal></GiMeal>Add Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/AllMeals"><FaUtensils></FaUtensils> All Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/AllReviews"><MdRateReview /> All Reviews</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/ServeMeals"><MdFoodBank /> Serve Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/UpcomingMeals"><BiSolidFoodMenu /> Upcoming Meals</NavLink>
                            </li>
                        </>
                            : <>
                                <li>
                                    <NavLink to="/Dashboard/MyProfile"><CgProfile></CgProfile>My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Dashboard/RequestedMeals"><GiMeal></GiMeal>Request Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Dashboard/MyReviews"><MdRateReview /> My Reviews</NavLink>
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