import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import EmptyPage from "../../Shard/Empty/EmptyPage";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 6;

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const axiosSecure = useAxiosSecure();

  const fetchMeals = async (reset = false) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "All") params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      params.append("page", reset ? 1 : page);
      params.append("limit", LIMIT);

      const res = await axiosSecure.get(`/meals?${params.toString()}`);
      const newMeals = res.data;

      if (reset) {
        setMeals(newMeals);
      } else {
        setMeals((prev) => [...prev, ...newMeals]);
      }

      setHasMore(newMeals.length === LIMIT);
      setPage(reset ? 2 : page + 1);
    } catch (err) {
      console.error("Cloth want wrong:", err);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMeals(true);
  };

  useEffect(() => {
    fetchMeals(true);
  }, []);

  return (
    <div className="px-4 max-w-7xl mx-auto py-4">
      {/* Filter Form */}
      <form onSubmit={handleFilter} className="mb-6">
        <div className="flex relative w-full max-w-2xl mx-auto mb-4 shadow-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cloth search..."
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
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Borkha ">T-shirt</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Three-Piece">Three-Piece</option>
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

      {/* Meals Grid */}
      {meals.length === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <EmptyPage />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={meals.length}
          next={() => fetchMeals()}
          hasMore={hasMore}
          loader={
            <h4 className="text-center py-4 text-gray-500">more Cloths loading...</h4>
          }
          endMessage={
            <p className="text-center text-sm text-gray-400 py-4">
              you well see the all cloth's
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col"
              >
                {/* Image */}
                <figure className="aspect-[4/3] w-full overflow-hidden relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-t-xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>

                {/* Body */}
                <div className="card-body flex flex-col flex-grow p-4">
                  <h2 className="card-title text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2 flex-grow">
                    {item.description || "No description"}
                  </p>

                  {/* Footer */}
                  <div className="card-actions justify-between items-center mt-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-semibold">
                      {item?.price} TK
                    </span>
                    <Link
                      to={`/meal/${item._id}`}
                      className="btn btn-sm btn-info normal-case hover:scale-105 transition-transform"
                    >
                      Details
                    </Link>
                  </div>
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
