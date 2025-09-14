import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import EmptyPage from "../../Shard/Empty/EmptyPage";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component"; // ✅ import infinite scroll

const LIMIT = 6; // ✅ how many meals to load per page

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1); // ✅ track current page
  const [hasMore, setHasMore] = useState(true); // ✅ tells InfiniteScroll if more meals can be loaded

  const axiosSecure = useAxiosSecure();

  // ✅ Fetch meals with pagination and filters
  const fetchMeals = async (reset = false) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "All") params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      params.append("page", reset ? 1 : page); // ✅ add pagination
      params.append("limit", LIMIT);

      const res = await axiosSecure.get(`/meals?${params.toString()}`);
      const newMeals = res.data;

      if (reset) {
        setMeals(newMeals);
      } else {
        setMeals((prev) => [...prev, ...newMeals]);
      }

      if (newMeals.length < LIMIT) {
        setHasMore(false); // ✅ no more data
      } else {
        setHasMore(true);
      }

      setPage((prev) => (reset ? 2 : prev + 1));
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  // Load initial data on first render
  useEffect(() => {
    fetchMeals(true);
  }, []);

  // Handle filter form submit
  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1); //  reset page on filter
    fetchMeals(true);
  };

  return (
    <div className="lg:w-7xl mx-auto p-4">
      {/* 🔍 Filter Form */}
      <form onSubmit={handleFilter} className="mb-6">
        <div className="flex relative w-full max-w-2xl mx-auto mb-4 shadow-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search meals, reviews..."
            className="w-full pl-10 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-info text-white px-4 rounded-r-md hover:bg-info-dark transition-colors"
          >
            Apply
          </button>
        </div>

        <div className="flex gap-2 mb-4 justify-center items-center lg:flex-wrap">
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
        </div>
      </form>

      {/* Meals List with Infinite Scroll */}
      {meals.length === 0 ? (
        <div className="flex justify-center items-center h-[300px] col-span-full">
          <EmptyPage />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={meals.length} 
          next={() => fetchMeals()} 
          hasMore={hasMore} //  tell component whether to continue loading
          loader={<h4 className="text-center py-4">Loading more meals...</h4>}
          endMessage={
            <p className="text-center text-sm text-gray-400 py-4">
              You've seen all Cloth.
            </p>
          }
        >
          <div className="grid lg:grid-cols-4 lg:pt-2 md:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div key={meal._id} className="card bg-base-100 shadow-lg">
                <figure>
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{meal.title}</h2>
                  <p className="text-sm text-gray-500">{meal.category}</p>
                  <p>৳ {meal.price}</p>
                  <p className="text-xs text-gray-400">
                    {meal.ingredients.join(", ")}
                  </p>
                  <Link
                    to={`/meal/${meal._id}`}
                    className="btn w-18 btn-outline btn-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Meals;
