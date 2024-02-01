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
        <div className="flex flex-col bg-secondary-300 md:flex-row-reverse w-full">
            <div className="w-full md:w-3/12 md:min-h-screen bg-primary-100 ">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/Dashboard/AdminProfile" className='font-semibold'><CgProfile></CgProfile>Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/ManageUsers" className="font-semibold"><FaUsers></FaUsers> Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/AddMeal" className="font-semibold"><GiMeal></GiMeal>Add Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/AllMeals" className="font-semibold"><FaUtensils></FaUtensils> All Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/AllReviews" className="font-semibold"><MdRateReview /> All Reviews</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/ServeMeals" className="font-semibold"><MdFoodBank /> Serve Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/UpcomingMeals" className="font-semibold"><BiSolidFoodMenu /> Upcoming Meals</NavLink>
                            </li>
                        </>
                            : <>
                                <li>
                                    <NavLink to="/Dashboard/MyProfile" className="font-semibold"><CgProfile></CgProfile>My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Dashboard/RequestedMeals" className="font-semibold"><GiMeal></GiMeal>Request Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Dashboard/MyReviews" className="font-semibold"><MdRateReview /> My Reviews</NavLink>
                                </li>
                            </>
                    }
                </ul>
                <div className="divider"></div>
                <>
                    <ul className="menu">
                        <li>
                            <NavLink to="/" className="font-semibold"><FaHome /> Home</NavLink>
                        </li>
                    </ul>
                </>
            </div>
            <div className=" md:w-8/12 m-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;