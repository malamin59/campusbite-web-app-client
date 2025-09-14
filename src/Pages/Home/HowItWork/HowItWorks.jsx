import React from "react";
import { motion } from "framer-motion";
import {
  FaUserAlt,
  FaTshirt,
  FaShoppingBag,
  FaTags,
  FaShippingFast,
  FaUndo,
  FaSmileBeam,
  FaStar,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";

// Feature list (fashion shop version)
const features = [
  {
    icon: <FaUserAlt className="text-4xl text-blue-600" />,
    title: "Easy Sign Up",
    desc: "Create your account in seconds and start shopping instantly.",
  },
  {
    icon: <FaTshirt className="text-4xl text-pink-500" />,
    title: "Trendy Collections",
    desc: "Explore the latest fashion styles updated every season.",
  },
  {
    icon: <FaShoppingBag className="text-4xl text-green-600" />,
    title: "Seamless Shopping",
    desc: "Add your favorites to cart and checkout in just a few clicks.",
  },
  {
    icon: <FaShippingFast className="text-4xl text-indigo-600" />,
    title: "Fast Delivery",
    desc: "Get your orders delivered quickly, right at your doorstep.",
  },
  {
    icon: <FaTags className="text-4xl text-yellow-500" />,
    title: "Exclusive Discounts",
    desc: "Enjoy seasonal sales and members-only offers every week.",
  },
  {
    icon: <FaUndo className="text-4xl text-red-500" />,
    title: "Easy Returns",
    desc: "Changed your mind? Return products within 7 days hassle-free.",
  },
  {
    icon: <FaSmileBeam className="text-4xl text-emerald-500" />,
    title: "Happy Customers",
    desc: "Trusted by thousands of fashion lovers worldwide.",
  },
  {
    icon: <FaStar className="text-4xl text-orange-400" />,
    title: "Top Rated",
    desc: "Highly rated for quality, design, and customer service.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-20">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        How Shopping Works
      </motion.h2>

      {/* Marquee icons */}
      <Marquee speed={50} gradient={false} className="mb-12">
        <div className="flex lg:gap-28 gap-12 text-4xl text-gray-500">
          <FaUserAlt />
          <FaTshirt />
          <FaShoppingBag />
          <FaTags />
          <FaShippingFast />
          <FaUndo />
          <FaSmileBeam />
          <FaStar />
        </div>
      </Marquee>

      {/* Animated Feature Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0,0,0,0.15)" }}
            className="bg-white rounded-2xl p-6 shadow-md text-center transition"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
