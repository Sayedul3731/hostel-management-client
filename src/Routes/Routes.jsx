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
import UpcomingUMeals from "../Pages/UpcomingUMeals/UpcomingUMeals";
import PrivetRoutes from "./PrivetRoutes";
import Rooms from "../Pages/Rooms/Rooms";
import RoomDetails from "../Pages/Rooms/RoomDetails";

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
        path: "/Meals",
        element: <Meals></Meals>
      },
      {
        path: '/UpcomingMeals',
        element: <UpcomingUMeals></UpcomingUMeals>
      },
      {
        path: '/Rooms',
        element: <Rooms></Rooms>
      },
      {
        path: '/roomDetails/:id',
        element: <RoomDetails></RoomDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/seats/${params.id}`)
      },
      {
        path: "/Login",
        element: <Login></Login>
      },
      {
        path: "/Register",
        element: <Register></Register>
      },
      {
        path: "/meal/:id",
        element: <MealDetails></MealDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/meals/meal/${params.id}`)
      },
      {
        path: "/review/:id",
        element: <MealDetails></MealDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/review/${params.id}`)
      },
      {
        path: "/reviews/:id",
        element: <MealDetails></MealDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/reviews/review/${params.id}`)
      },
      {
        path: "/checkout/:type",
        element: <PrivetRoutes><Checkout></Checkout></PrivetRoutes>,
        loader: ({ params }) => fetch(`http://localhost:5000/packages/${params.type}`)
      }
    ]
  },
  {
    path: "Dashboard",
    element: <PrivetRoutes><Dashboard></Dashboard></PrivetRoutes>,
    children: [
      // Admin Routes 
      {
        path: "AdminProfile",
        element: <AdminProfile></AdminProfile>
      },
      {
        path: "ManageUsers",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "AddMeal",
        element: <AddMeal></AddMeal>
      },
      {
        path: "AllMeals",
        element: <AllMeals></AllMeals>
      },
      {
        path: "AllReviews",
        element: <AllReviews></AllReviews>
      },
      {
        path: "ServeMeals",
        element: <ServeMeals></ServeMeals>
      },
      {
        path: "UpcomingMeals",
        element: <UpcomingMeals></UpcomingMeals>
      },

      // user routes 
      {
        path: "MyProfile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "RequestedMeals",
        element: <RequestedMeals></RequestedMeals>
      },
      {
        path: "MyReviews",
        element: <MyReviews></MyReviews>
      }
    ]
  }
]);
export default router;