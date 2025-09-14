import { motion } from "framer-motion";
import { FaTshirt, FaShippingFast, FaUndo, FaStar } from "react-icons/fa";

const cards = [
  {
    icon: <FaTshirt className="text-pink-500 text-5xl" />,
    title: "Trendy Styles",
    desc: "Stay ahead with our latest fashion collections, updated every season.",
  },
  {
    icon: <FaStar className="text-yellow-500 text-5xl" />,
    title: "Premium Quality",
    desc: "Handpicked fabrics and designs to give you comfort and durability.",
  },
  {
    icon: <FaShippingFast className="text-green-500 text-5xl" />,
    title: "Fast Delivery",
    desc: "Get your favorite outfits delivered quickly, right to your doorstep.",
  },
  {
    icon: <FaUndo className="text-blue-500 text-5xl" />,
    title: "Easy Returns",
    desc: "Hassle-free 7-day return policy to keep your shopping worry-free.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Why Shop with <span className="text-pink-600">StyleHub</span>?
        </motion.h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-16">
          Discover why thousands of fashion lovers trust us for their clothing needs.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="mb-4 flex justify-center">{card.icon}</div>
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
