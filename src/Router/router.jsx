import { createBrowserRouter } from "react-router";
import Error from "../Shard/Error";
import MainLaOut from "../Layouts/MainLaOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LogIn/Login";
import Register from "../Pages/Register/Register";
import Meals from "../Pages/Meals/Meals";
import DashboardLayout from "../Layouts/DashboardLayout";
import AdminHome from "../Pages/DashboardPages/Admin/AdminHome";
// import UserProfile from "../Pages/DashboardPages/UserProfile/UserProfile";
import ManageUsers from "../Pages/DashboardPages/ManageUsers/ManageUsers";
import ServeMeals from "../Pages/DashboardPages/ServeMeals/ServeMeals";
import AllReviews from "../Pages/DashboardPages/AllReviews/AllReviews";
import AllMeals from "../Pages/DashboardPages/AllMeals/AllMeals";
import UpcomingMeals from "../Pages/DashboardPages/UpcomingMeals/UpcomingMeals";
import RequestedMeal from "../Pages/DashboardPages/UserDashboard/RequestedMeal";
import MyReviews from "../Pages/DashboardPages/UserDashboard/MyReviews";
import PaymentHistory from "../Pages/DashboardPages/UserDashboard/PaymentHistory";
import PrivateRoute from "./PrivateRout";
import AdminRouts from "./AdminRout";
import AdminProfile from "../Pages/DashboardPages/AdminProfile/AdminProfile";
import UserProfile from "../Pages/DashboardPages/UserDashboard/UserProfile";
import AddMeal from "../Pages/DashboardPages/AddMeal/AddMeal";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import UserRout from "./UserRout";
import MealDetails from "../Pages/MealDetails/MealDetails";
import UpdateReview from "../Components/UpdateReview";
import UpdateMeal from "../Components/UpdateMeal";
import UpcomingMealsForAdmin from "../Pages/DashboardPages/upconingMeal/UpcomingMealsForAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLaOut />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/badges`),
        element: <Home />,
      },
      {
        path: "/meals",
        element: (
          <PrivateRoute>
            <Meals />
          </PrivateRoute>
        ),
      },
      {
        path: "/upcomingMeals",
        element: (
          <PrivateRoute>
            {" "}
            <UpcomingMeals />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkoutPage/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/badges/${params.id}`),
        element: (
          <PrivateRoute>
            {" "}
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "meal/:id",
        element: <MealDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  /* dashboard path */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      {
        path: "adminProfile",
        element: (
          <AdminRouts>
            {" "}
            <AdminProfile />{" "}
          </AdminRouts>
        ),
      },
      {
        path: "addedMeals",
        element: (
          <AdminRouts>
            {" "}
            <AddMeal />{" "}
          </AdminRouts>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRouts>
            <ManageUsers />{" "}
          </AdminRouts>
        ),
      },

      {
        path: "serveMeals",
        element: (
          <AdminRouts>
            <ServeMeals />
          </AdminRouts>
        ),
      },
      {
        path: "allReviews",
        element: (
          <AdminRouts>
            <AllReviews />{" "}
          </AdminRouts>
        ),
      },
      { path: "allMeals", element: <AllMeals /> },
      {
        path: "upcomingMeals",
        element: (
          <AdminRouts>
            {" "}
            <UpcomingMealsForAdmin/>
          </AdminRouts>
        ),
      },

      {
        path: "/dashboard/updateMeal/:id",
        element: (
          <PrivateRoute>
            <UpdateMeal />
          </PrivateRoute>
        ),
      },

      /* user routs */

      {
        path: "userProfile",
        element: (
          <UserRout>
            <UserProfile />
          </UserRout>
        ),
      },
      {
        path: "requested-meals",
        element: (
          <UserRout>
            {" "}
            <RequestedMeal />{" "}
          </UserRout>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <UserRout>
            {" "}
            <UserRout>
              <MyReviews />
            </UserRout>
          </UserRout>
        ),
      },
      {
        path: "payment-history",
        element: (
          <UserRout>
            {" "}
            <PaymentHistory />
          </UserRout>
        ),
      },
      {
        path: "upcomingMeals",
        element: (
          <UserRout>
            {" "}
            <UpcomingMeals />
          </UserRout>
        ),
      },
      {
        path: "/dashboard/updateReview/:id",
        element: (
          <PrivateRoute>
            <UpdateReview />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
