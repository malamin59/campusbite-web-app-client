// import { useLoaderData } from "react-router";
// import { FaCheckCircle, FaMedal } from "react-icons/fa";
// import { motion } from "framer-motion";

// const CheckoutPage = () => {
//   const badge = useLoaderData();
//   const { name, price, benefits } = badge;
//   const badgeColors = {
//     Silver: "text-gray-400",
//     Gold: "text-yellow-400",
//     Platinum: "text-purple-500",
//   };

//   return (
// <div className="w-96 mx-auto mt-10 "> 
    
//         <motion.div
//       whileHover={{ scale: 1.03 }}
//       className="rounded-xl p-6 shadow-lg transition-all duration-300 bg-base-200 text-gray-800"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <FaMedal
//             className={`text-2xl ${badgeColors[name] || "text-gray-400"}`}
//           />
//           <h3 className="text-xl font-bold">{name} Plan</h3>
//         </div>
//         <p className="text-lg font-semibold">৳{price}</p>
//       </div>

//       {/* Benefits */}
//       <ul className="space-y-2 text-sm mt-2">
//         {benefits?.map((benefit, idx) => (
//           <li
//             key={idx}
//             className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md text-xs font-medium w-fit"
//           >
//             <FaCheckCircle className="text-green-500" />
//             {benefit}
//           </li>
//         ))}
//       </ul>
//     </motion.div>
// </div>
//   );
// };

// export default CheckoutPage;

import { useLoaderData } from "react-router";
import { FaCheckCircle, FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const badge = useLoaderData();
  const { name, price, benefits } = badge;
  const badgeColors = {
    Silver: "text-gray-400",
    Gold: "text-yellow-400",
    Platinum: "text-purple-500",
  };

  // Create a short summary string for benefits
  const benefitsSummary = benefits?.join(", ") || "";

  return (
    <div className="w-96 mx-auto mt-10">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="card bg-base-100 shadow-sm"
      >
       
        <div className="card-body">
          <div className="flex items-center gap-2 mb-2">
            <FaMedal
              className={`text-2xl ${badgeColors[name] || "text-gray-400"}`}
            />
            <h2 className="card-title">{name} Plan</h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">{benefitsSummary}</p>

          <p className="text-lg font-semibold mb-4">Price: ৳{price}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-info">Buy Now</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
