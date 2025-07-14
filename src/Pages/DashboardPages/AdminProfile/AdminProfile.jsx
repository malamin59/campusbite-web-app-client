import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaUserFriends,
  FaPaperPlane,
  FaCreditCard,
} from "react-icons/fa";
import useRole from "../../../Hooks/UseRole";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res1 = await axiosSecure.get("/totalMeals");
      const res2 = await axiosSecure.get("/totalRequest");
      const res3 = await axiosSecure.get("/totalUsers");
      const res4 = await axiosSecure.get("/totalPayment");

      return {
        totalAddMeals: res1.data,
        totalRequests: res2.data,
        totalUsers: res3.data,
        totalPayment: res4.data,
      };
    },
  });

  if (!user) {
    return <p className="text-center mt-10">No user is logged in.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Profile Card */}
      <div className="max-w-md mx-auto p-6 bg-base-200 rounded shadow text-center">
        <img
          src={user?.photoURL || "https://photo.com"}
          alt={user.displayName || "User Profile"}
          className="mx-auto rounded-full w-32 h-32 object-cover mb-4 border-4 border-info"
        />
        <h3 className="font-bold bg-info w-22 mx-auto rounded-2xl">
          {" "}
         {role.toUpperCase()}
        </h3>
        <h2 className="text-2xl font-semibold mb-2">
          {user.displayName || "No Name"}
        </h2>
        <p className="text-lg text-gray-700">{user.email || "No Email"}</p>
      </div>

      {/* Animated Stat Cards */}
      <div className="grid grid-cols-1 mb-6 lg:grid-cols-4 md:grid-cols-2 gap-4 mt-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-info text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaUtensils className="text-4xl mb-2" />
          <h3 className="text-xl font-semibold">Total Meals</h3>
          <p className="text-2xl font-bold">{data?.totalAddMeals}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-primary text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaPaperPlane className="text-4xl mb-2" />
          <h3 className="text-xl font-semibold">Total Requests</h3>
          <p className="text-2xl font-bold">{data?.totalRequests}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-success text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaUserFriends className="text-4xl mb-2" />
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{data?.totalUsers || 0}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-amber-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaCreditCard className="text-4xl mb-2" />
          <h3 className="text-xl font-semibold">Total Payment</h3>
          <p className="text-2xl font-bold"> {data?.totalPayment || 0}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfile;
