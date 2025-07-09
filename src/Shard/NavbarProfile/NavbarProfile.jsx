import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const NavbarProfile = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1"
          >
            <img
              src={user.photoURL}
              alt="profile"
              className="w-10 h-10 rounded-full border border-info"
            />
            <FaAngleDown className="text-info" />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-14 right-0 bg-base-100 shadow-md rounded-md p-3 z-50 w-52">
              <p className="text-info font-semibold px-2 mb-2">{user.displayName}</p>
              <Link to="/dashboard" className="block px-2 py-1 hover:bg-base-200 rounded">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-2 py-1 hover:bg-base-200 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="btn btn-info">
          Join Us
        </Link>
      )}
    </div>
  );
};

export default NavbarProfile;
