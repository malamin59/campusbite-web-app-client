import { FaTshirt, FaShippingFast, FaTags, FaSmileBeam, FaGem, FaSyncAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const SpecialFeatures = () => {
  const features = [
    {
      icon: <FaTshirt className="text-4xl text-pink-500" />,
      title: "Trendy Collections",
      description: "Discover the latest fashion trends, updated every season to keep you stylish.",
    },
    {
      icon: <FaGem className="text-4xl text-purple-500" />,
      title: "Premium Quality",
      description: "We use only the finest fabrics and materials for comfort and durability.",
    },
    {
      icon: <FaShippingFast className="text-4xl text-green-500" />,
      title: "Fast & Free Delivery",
      description: "Get your orders quickly with our fast, reliable, and free delivery service.",
    },
    {
      icon: <FaTags className="text-4xl text-blue-500" />,
      title: "Exclusive Discounts",
      description: "Enjoy seasonal sales, special deals, and members-only offers.",
    },
    {
      icon: <FaSmileBeam className="text-4xl text-yellow-500" />,
      title: "Customer Happiness",
      description: "Thousands of happy customers trust us for their fashion needs.",
    },
    {
      icon: <FaSyncAlt className="text-4xl text-red-500" />,
      title: "Easy Returns",
      description: "Not satisfied? Return your items easily with our hassle-free policy.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-20 lg:px-0 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Why Choose <span className="text-pink-600">StyleHub</span>?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Shopping for clothes should be easy, fun, and rewarding — here’s why our store stands out.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-5 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {feature.icon}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialFeatures;
