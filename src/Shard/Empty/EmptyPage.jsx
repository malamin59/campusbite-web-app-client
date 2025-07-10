import React from "react";
import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";

const bounceTransition = {
  y: {
    duration: 0.6,
    yoyo: Infinity,
    ease: "easeOut",
  },
};

const EmptyPage = ({ message = "No data found!" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <motion.div
        animate={{ y: ["0%", "-20%", "0%"] }}
        transition={bounceTransition}
        className="text-info text-9xl"
      >
        <MdErrorOutline />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-3xl font-bold text-gray-700 mt-6"
      >
        {message}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-gray-500 mt-2"
      >
        Try refreshing the page or come back later.
      </motion.p>
    </div>
  );
};

export default EmptyPage;
