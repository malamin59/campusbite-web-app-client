import React from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaUtensils, FaStar, FaHeart, FaTools, FaCrown, FaChartLine, FaCheckCircle } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const features = [
  {
    icon: <FaUserAlt className="text-4xl text-blue-600" />,
    title: "User Registration",
    desc: "Create your account using Google and get started immediately.",
  },
  {
    icon: <FaUtensils className="text-4xl text-green-600" />,
    title: "Browse Meals",
    desc: "Discover a variety of upcoming and published meals daily.",
  },
  {
    icon: <FaHeart className="text-4xl text-pink-500" />,
    title: "Like Meals",
    desc: "Premium users can like meals to promote them to publication.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-indigo-600" />,
    title: "Request Meals",
    desc: "Request your favorite meals to be served from the admin panel.",
  },
  {
    icon: <FaCrown className="text-4xl text-yellow-500" />,
    title: "Premium Access",
    desc: "Get Silver, Gold, or Platinum badges to unlock premium features.",
  },
  {
    icon: <FaTools className="text-4xl text-gray-700" />,
    title: "Admin Tools",
    desc: "Admins can manage users, publish meals, and deliver requests.",
  },
  {
    icon: <FaStar className="text-4xl text-orange-400" />,
    title: "Rate & Review",
    desc: "Users can leave reviews and ratings on served meals.",
  },
  {
    icon: <FaChartLine className="text-4xl text-emerald-500" />,
    title: "Track Popularity",
    desc: "See which meals are trending by likes and user engagement.",
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4  mt-14">
      <h2 className="text-4xl font-bold text-center mb-8"> How It Works</h2>

      {/* Marquee */}
      <Marquee speed={60} className="mb-10 ">
        <div className="flex lg:gap-28 gap-12 text-4xl  text-gray-600">
          <FaUserAlt />
          <FaUtensils />
          <FaHeart />
          <FaCrown />
          <FaCheckCircle />
          <FaStar />
          <FaChartLine />
          <FaTools />
        </div>
      </Marquee>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
