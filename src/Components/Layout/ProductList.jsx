import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import LoadingSpinner from "../../Shard/LoadingSpinner/LoadingSpinner";
import Error from "../../Shard/Error";

const limit = 6;

const ProductList = ({ title, queryKey, endpoint }) => {
  // fetch function
  const fetchProducts = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/${endpoint}?page=${pageParam}&limit=${limit}`
    );
    return {
      data: res.data,
      nextPage: res.data.length === limit ? pageParam + 1 : null,
    };
  };

  // useInfiniteQuery
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchProducts,
      getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error />;

  const products = data.pages.flatMap((page) => page.data);

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {title}
      </h2>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <p className="text-center mt-4 text-gray-500">Loading more...</p>
        }
        endMessage={
          <p className="text-center mt-4 text-gray-500">No more items</p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div className="card bg-base-100  shadow-sm">
              <figure className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item?.image}
                  alt={item?.title || "Cloth image"}
                  className="w-full h-full object-cover rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item?.title} </h2>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="card-actions justify-between items-center mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-semibold">
                    {item?.price} TK
                  </span>
                  <Link
                    to={`/meal/${item._id}`}
                    className="btn btn-sm btn-info normal-case"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
