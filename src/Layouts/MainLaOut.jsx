import Footer from "../Shard/Footer";
import { Outlet } from "react-router";
import Navbar from "../Shard/Navbar";

const MainLaOut = () => {
  return (
    <div className=" overflow-x-hidden bg-white">
      <Navbar />
      <div className=" min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLaOut;
