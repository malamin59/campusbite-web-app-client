import { useEffect, useState } from "react";
import axios from "axios";
import EmptyPage from "../../../Shard/Empty/EmptyPage";
import { Link } from "react-router";

const MealTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals-g?category=${activeTab}`
      );
      setMeals(res.data);
    };
    fetchMeals();
  }, [activeTab]);

  const tabs = ["All", "Breakfast", "Lunch", "Dinner"];
  if (meals && 0) {
    return <EmptyPage />;
  }
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Tab Menu */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md font-semibold border ${
              activeTab === tab
                ? "bg-info text-white"
                : "bg-base-200 text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Meals List */}
      <div className="grid md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <img
              src={meal.image}
              alt={meal.title}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-3">{meal.title}</h3>
            <p className="text-gray-600">Price: ৳{meal.price}</p>
            <p className="text-yellow-500">Rating: {meal.rating}</p>
            <Link to={`/meal/${meal._id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealTabs;
