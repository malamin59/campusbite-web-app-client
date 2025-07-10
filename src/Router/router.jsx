import { createBrowserRouter } from "react-router";
import Error from "../Shard/Error";
import MainLaOut from "../Layouts/MainLaOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LogIn/Login";
import Register from "../Pages/Register/Register";
import Meals from "../Pages/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import DashboardLayout from "../Layouts/DashboardLayout";
import AdminHome from "../Pages/DashboardPages/Admin/AdminHome";
import UserProfile from "../Pages/DashboardPages/UserProfile/UserProfile";
import ManageUsers from "../Pages/DashboardPages/ManageUsers/ManageUsers";

const router = createBrowserRouter([
{
    path: '/',
    element: <MainLaOut/>,
    errorElement: <Error/>,
    children:[
        {
            path:'/',
            element: <Home/>
        },
        {
            path:'/meals',
            element: <Meals/>
        },
        {
            path:'/upcomingMeals',
            element: <UpcomingMeals/>
        }
    ]
    
    
},
{
path:'/login',
element:<Login/>
},
{
path:'/register',
element:<Register/>
}
,
{
    path: "/dashboard",
    element: <DashboardLayout />  ,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "profile", element: <UserProfile /> },
      { path: "meals", element: <Meals /> },
      { path: "users", element: <ManageUsers /> },
    ],
  },


]);
export default router;
