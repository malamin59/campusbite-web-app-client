import { Link } from "react-router";
import navIcon from "../assets/image/navIcon.png";

const NavbarIcon = () => {
  return (
    <div className="lg:w-38 md:w-28 w-12 gap-1 flex justify-between items-center ">
    
        <Link to="/">
          <img src={navIcon} alt="" />
        </Link>
          
       <div className="">
         <p className="text-info text-xl hidden lg:block "> campusbite </p>
       </div>
      </div>
    
  );
};

export default NavbarIcon;
