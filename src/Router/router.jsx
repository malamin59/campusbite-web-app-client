import { createBrowserRouter } from "react-router";
import Error from "../Shard/Error";
import MainLaOut from "../Layouts/MainLaOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LogIn/Login";
import Register from "../Pages/Register/Register";

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
