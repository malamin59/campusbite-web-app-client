import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import LoadingSpinner from "../../Shard/LoadingSpinner/LoadingSpinner";
import Error from "../../Shard/Error";

const limit = 6;

const fetchShirts = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/Three-Piece?page=${pageParam}&limit=${limit}`
  );
  return {
    data: res.data,
    nextPage: res.data.length === limit ? pageParam + 1 : null,
  };
};

const ThreePiece = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["ThreePiece"],
      queryFn: fetchShirts,
      getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error />;

  const shirts = data.pages.flatMap((page) => page.data);
  console.log(shirts);

  return (
    <div className="px-4  max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {" "}
        Three Piece Collection
      </h2>

      <InfiniteScroll
        dataLength={shirts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <p className="text-center mt-4 text-gray-500">
            Loading more shirts...
          </p>
        }
        endMessage={
          <p className="text-center mt-4 text-gray-500">
            No more  shirts to display
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shirts.map((shirt) => (
            <div
              key={shirt._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden flex flex-col"
            >
                       <div className="relative w-10/12 mx-auto">
  <img
    src={shirt.image}
    alt={shirt.title}
    className="w-full h-52 object-cover rounded-lg"
  />
</div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {shirt.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 flex-grow">
                  {shirt.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-blue-600 font-bold">
                    {shirt?.price} TK
                  </span>
                  <Link
                    to={`/meal/${shirt._id}`}
                    className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
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

export default ThreePiece;
