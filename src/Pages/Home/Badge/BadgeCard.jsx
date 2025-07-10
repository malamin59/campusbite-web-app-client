import { FaCheckCircle, FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";

// Unique badge colors only (not full card bg)
const badgeColors = {
  Silver: "text-gray-400",
  Gold: "text-yellow-400",
  Platinum: "text-purple-500",
};

const BadgeCard = ({ badge }) => {
  const { name, price, benefits } = badge;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-xl p-6 shadow-lg transition-all duration-300 bg-base-200 text-gray-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaMedal className={`text-2xl ${badgeColors[name] || "text-gray-400"}`} />
          <h3 className="text-xl font-bold">{name} Plan</h3>
        </div>
        <p className="text-lg font-semibold">৳{price}</p>
      </div>

      {/* Benefits */}
      <ul className="space-y-2 text-sm mt-2">
        {benefits?.map((benefit, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md text-xs font-medium w-fit"
          >
            <FaCheckCircle className="text-green-500" />
            {benefit}
          </li>
        ))}
      </ul>

      {/* Upgrade Button */}
      <button className="mt-6 btn btn-sm btn-info w-full">
        Upgrade to {name}
      </button>
    </motion.div>
  );
};

export default BadgeCard;
