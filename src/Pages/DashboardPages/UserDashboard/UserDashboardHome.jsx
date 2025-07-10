import { motion } from "framer-motion";
import { FaUserCircle, FaUtensils, FaCalendarAlt, FaCommentDots, FaMoneyCheckAlt } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import useAuth from "../../../Hooks/useAuth";

const UserDashboardHome = () => {
  const { user } = useAuth();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Bouncing User Icon */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-info"
      >
        <FaUserCircle className="text-[80px] md:text-[120px]" />
      </motion.div>

      {/* Welcome Message */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-info mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Welcome, <br /> {user?.displayName || "User"}! 
      </motion.h1>

      {/* Description */}
      <p className="text-gray-600 mt-2 text-sm md:text-base max-w-md">
        Manage your profile, meals, reviews, and payments — all in one place.
      </p>

      {/* 🚀 Marquee Section */}
      <div className="w-full mt-10 overflow-hidden">
        <Marquee pauseOnHover={false} speed={50} gradient={false}>
          <div className="flex gap-6 md:gap-10 items-center text-info flex-wrap px-2 text-base md:text-xl">
            <span className="flex items-center gap-2"><FaUtensils /> Meals</span>
            <span className="flex items-center gap-2"><FaCalendarAlt /> Upcoming Meals</span>
            <span className="flex items-center gap-2"><FaCommentDots /> Reviews</span>
            <span className="flex items-center gap-2"><FaMoneyCheckAlt /> Payment History</span>
            <span className="flex items-center gap-2"><FaUtensils /> Request Meals</span>
          </div>
        </Marquee>
      </div>
    </motion.div>
  );
};

export default UserDashboardHome;
