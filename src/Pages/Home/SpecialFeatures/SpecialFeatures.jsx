import { FaRocket, FaUtensils, FaUserGraduate, FaFire, FaSmile, FaCoins } from "react-icons/fa";
import { motion } from "framer-motion";

const SpecialFeatures = () => {
  const features = [
    {
      icon: <FaRocket className="text-4xl text-blue-600" />,
      title: "Lightning Fast Delivery",
      description: "We ensure your meals are delivered fresh, hot, and always on time.",
    },
    {
      icon: <FaUtensils className="text-4xl text-green-500" />,
      title: "Handpicked Menus",
      description: "Our meals are curated with student tastes and health in mind.",
    },
    {
      icon: <FaUserGraduate className="text-4xl text-purple-600" />,
      title: "Student-First Platform",
      description: "Built by students, for students. Your needs come first — always.",
    },
    {
      icon: <FaFire className="text-4xl text-red-500" />,
      title: "Hot Deals Daily",
      description: "Enjoy daily discounts and offers only available to campus users.",
    },
    {
      icon: <FaSmile className="text-4xl text-yellow-500" />,
      title: "Loved by Students",
      description: "Thousands of positive reviews from students across the country.",
    },
    {
      icon: <FaCoins className="text-4xl text-amber-600" />,
      title: "Affordable Pricing",
      description: "High quality doesn’t have to be high priced — especially for students.",
    },
  ];

  return (
    <section className="bg-white py-20 lg:px-0 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-info mb-3">What Makes CampusBite Special?</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We go beyond food — we create an experience that supports your student journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-5"
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
