import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import { FaHome, FaUser, FaUtensils, FaUsers } from "react-icons/fa";
import NavbarIcon from "../Shard/Navbaricon";
import useRole from "../Hooks/UseRole";
import LoadingSpinner from "../Shard/LoadingSpinner/LoadingSpinner";
import {
  FaConciergeBell,
  FaCalendarAlt,
  FaRegListAlt,
  FaClipboardList,
  FaCommentAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, isRoleLoading] = useRole();
  console.log("your role is", role);
  if (isRoleLoading) return <LoadingSpinner />;

  const links = (
    <>
      {role === "user" && (
        <>
          <NavLink
            to="/dashboard/userProfile"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaUser /> My Profile
          </NavLink>

          <NavLink
            to="/dashboard/requested-meals"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaUtensils /> Requested Meals
          </NavLink>

          <NavLink
            to="/dashboard/my-reviews"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaCommentAlt /> My Reviews
          </NavLink>

          <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaMoneyCheckAlt /> Payment History
          </NavLink>
        </>
      )}

      {role === "admin" && (
        <>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/dashboard/addedMeals"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaUtensils /> Added Meals
          </NavLink>
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers /> Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/upcomingMeals"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaCalendarAlt /> Upcoming Meals
          </NavLink>

          <NavLink
            to="/dashboard/serveMeals"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaConciergeBell /> Serve Meals
          </NavLink>

          <NavLink
            to="/dashboard/allReviews"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaRegListAlt /> All Reviews
          </NavLink>

          <NavLink
            to="/dashboard/allMeals"
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-info text-white"
                : "btn btn-sm btn-outline"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaClipboardList /> All Meals
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile hamburger */}
      <div className="lg:hidden p-2 bg-base-200 fixed top-0 left-0 z-50 w-full flex items-center justify-between shadow">
        <NavbarIcon />
        <button
          className="btn btn-ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-base-200 p-4 space-y-4
          fixed top-12 left-0  lg:h-auto h-full z-40
          w-64
          transform
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex-shrink-0
        `}
      >
        <div className="hidden lg:block">
          <NavbarIcon />
        </div>
        <nav className="flex flex-col gap-2 mt-4">{links}</nav>
      </aside>

      {/* Main Content */}
      {/* Add margin top on mobile to not be hidden behind the fixed top bar */}
      <main className="flex-1 p-6 bg-base-100 mt-12 lg:mt-0 lg:ml-64">
        <Outlet />
      </main>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;

DashboardLayout.jsx;
