import { NavLink } from "react-router";
import NavbarIcon from "./Navbaricon";
import NavbarProfile from "./NavbarProfile/NavbarProfile";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const links = (
    <>
      <li className="px-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "btn btn-sm btn-info text-white" : "text-info hover:underline"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="px-1">
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "btn btn-sm btn-info text-white" : "text-info hover:underline"
          }
        >
          Meals
        </NavLink>
      </li>
      <li className="px-1">
        <NavLink
          to="/upcomingMeals"
          className={({ isActive }) =>
            isActive ? "btn btn-sm btn-info text-white" : "text-info hover:underline"
          }
        >
          Upcoming Meals
        </NavLink>
      </li>
      <li className="px-1 relative">
        <div>
          <button className="btn btn-sm btn-ghost text-info relative">
          <IoMdNotificationsOutline className="text-2xl" />
          <span className="absolute -top-1 -right-1 bg-info text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>
        </div>
      </li>
    </>
  );

  return (
    <div className="drawer  fixed top-0 z-50">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-sm ">
          {/* Left side (hamburger + logo) */}
          <div className="navbar-start ">
            <label htmlFor="drawer-toggle" className="btn btn-ghost p-0   lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <NavbarIcon />
          </div>

          {/* Center - desktop links */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>

          {/* Right side - profile */}
          <div className="navbar-end">
            <NavbarProfile />
          </div>
        </div>
      </div>

      {/* Drawer menu (left side) */}
      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content space-y-2">
          <div className="mb-2">
            <NavbarIcon />
          </div>
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

