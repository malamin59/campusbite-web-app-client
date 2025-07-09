import { createBrowserRouter } from "react-router";
import Error from "../Shard/Error";
import MainLaOut from "../Layouts/MainLaOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LogIn/Login";
import Register from "../Pages/Register/Register";
import Meals from "../Pages/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";

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



]);
export default router;
