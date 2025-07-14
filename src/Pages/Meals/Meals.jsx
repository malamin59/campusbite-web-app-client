import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import EmptyPage from "../../Shard/Empty/EmptyPage";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const axiosSecure = useAxiosSecure();

  const fetchMeals = async () => {
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (category && category !== "All") params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      const res = await axiosSecure.get(`/meals?${params.toString()}`);
      setMeals(res.data);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  useEffect(() => {
    fetchMeals(); // Load all meals on first render
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchMeals(); // Fetch meals based on filters
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Filter Form */}
      <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button type="submit" className="btn btn-info col-span-1 md:col-span-4">
          Apply Filters
        </button>
      </form>

      {/* Meals List */}
      <div className="grid md:grid-cols-3 gap-6">
        {meals.length === 0 ? (
          <div> <EmptyPage/></div>
        ) : (
          meals.map((meal) => (
            <div key={meal._id} className="card bg-base-100 shadow-lg">
              <figure>
                <img src={meal.image} alt={meal.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{meal.title}</h2>
                <p className="text-sm text-gray-500">{meal.category}</p>
                <p>৳ {meal.price}</p>
                <p className="text-xs text-gray-400">{meal.ingredients.join(", ")}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Meals;
