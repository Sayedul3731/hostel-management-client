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
          loader: ({params}) => fetch(`http://localhost:5000/meals/${params.id}`)
        },
        {
          path: "/meals/meal/:id",
          element: <MealDetails></MealDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/meals/${params.id}`)
        }
      ]
    },
    {
      path: "dashboard",
      element: <Dashboard></Dashboard>,
      children: [
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