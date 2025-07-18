import { motion } from "framer-motion";
import { FaBolt, FaShieldAlt, FaCrown, FaChartLine } from "react-icons/fa";

const cards = [
  {
    icon: <FaBolt className="text-orange-500 text-5xl" />,
    title: "Fast Performance",
    desc: "Enjoy lightning-fast meal discovery with optimized search and loading.",
  },
  {
    icon: <FaShieldAlt className="text-blue-500 text-5xl" />,
    title: "Top Security",
    desc: "Secure login, protected routes, and data safety for every user.",
  },
  {
    icon: <FaCrown className="text-purple-600 text-5xl" />,
    title: "Premium Features",
    desc: "Exclusive likes, reviews, and badges for Silver, Gold, and Platinum users.",
  },
  {
    icon: <FaChartLine className="text-green-600 text-5xl" />,
    title: "Smart Analytics",
    desc: "Meals are ranked and published based on real-time likes and trends.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Why Choose <span className="text-info">CampusBite</span>?
        </motion.h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-16">
          Explore the features that make our platform stand out from the rest.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;