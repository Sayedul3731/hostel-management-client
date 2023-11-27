import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import MealDetails from "../Pages/Home/MealsByCategory/MealDetails/MealDetails";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import RequestedMeals from "../Pages/Dashboard/RequestedMeals/RequestedMeals";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AddMeal from "../Pages/Dashboard/AddMeal/AddMeal";
import AllMeals from "../Pages/Dashboard/AllMeals/AllMeals";
import AllReviews from "../Pages/Dashboard/AllReviews/AllReviews";
import ServeMeals from "../Pages/Dashboard/ServeMeals/ServeMeals";
import UpcomingMeals from "../Pages/Dashboard/UpcomingMeals/UpcomingMeals";
import Checkout from "../components/Checkout/Checkout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/meals",
            element: <Meals></Meals>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: "/meal/:id",
          element: <MealDetails></MealDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/meals/meal/${params.id}`)
        },
        {
          path: "/meals/meal/:id",
          element: <MealDetails></MealDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/meals/${params.id}`)
        },
        {
          path: "/checkout/:type",
          element: <Checkout></Checkout>,
          loader: ({params}) => fetch(`http://localhost:5000/packages/${params.type}`)
        }
      ]
    },
    {
      path: "dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        // Admin Routes 
        {
          path: "adminProfile",
          element: <AdminProfile></AdminProfile>
        },
        {
          path: "manageUsers",
          element: <ManageUsers></ManageUsers>
        },
        {
          path: "addMeal",
          element: <AddMeal></AddMeal>
        },
        {
          path: "allMeals",
          element: <AllMeals></AllMeals>
        },
        {
          path: "allReviews",
          element: <AllReviews></AllReviews>
        },
        {
          path: "serveMeals",
          element: <ServeMeals></ServeMeals>
        },
        {
          path: "upcomingMeals",
          element: <UpcomingMeals></UpcomingMeals>
        },

        // user routes 
        {
          path: "myProfile",
          element: <MyProfile></MyProfile>
        },
        {
          path: "requestedMeals",
          element: <RequestedMeals></RequestedMeals>
        },
        {
          path: "myReviews",
          element: <MyReviews></MyReviews>
        }
      ]
    }
  ]);
export default router;