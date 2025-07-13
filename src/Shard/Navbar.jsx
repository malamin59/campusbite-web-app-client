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
            isActive
              ? "btn btn-sm btn-info text-white"
              : "text-info hover:underline"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="px-1">
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm btn-info text-white"
              : "text-info hover:underline"
          }
        >
          Meals
        </NavLink>
      </li>
      <li className="px-1">
        <NavLink
          to="/upcomingMeals"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm btn-info text-white"
              : "text-info hover:underline"
          }
        >
          Upcoming Meals
        </NavLink>
      </li>
      <li className="px-1 relative">
        <button className="btn btn-sm btn-ghost text-info relative">
          <IoMdNotificationsOutline className="text-2xl" />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-info text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost p-0 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavbarIcon />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {/* photoURL */}

      <div className="navbar-end">
        <NavbarProfile />
      </div>
    </div>
  );
};

export default Navbar;
