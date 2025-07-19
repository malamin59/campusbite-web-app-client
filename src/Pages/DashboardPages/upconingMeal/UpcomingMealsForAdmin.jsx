import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Pagination from "../../../Shard/Pagination/Pagination";
import { Link } from "react-router";
import EmptyPage from "../../../Shard/Empty/EmptyPage";
import toast from "react-hot-toast";

const UpcomingMealsForAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data = {}, refetch } = useQuery({
    queryKey: ["upcomingMeals", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/upcoming-meals?page=${page}&limit=10`
      );
      return res.data;
    },
  });

  const meals = data.meals || [];
  const total = data.total || 0;
  console.log(data);
  console.log(data);

  const headers = [
    { label: "Title", key: "title" },
    { label: "Category", key: "category" },
    { label: "Likes", key: "likes", sortKey: "likes" },
  ];

  const handlePublish = async (id) => {
    try {
      await axiosSecure.patch(`/meals/publish/${id}`);
      toast.success("meal Publish Successfully!")
      refetch();
    } catch (error) {
      console.error("Publish error:", error);
    }
  };

  const actions = (meal) => [
    <button
      key="publish"
      onClick={() => handlePublish(meal._id)}
      className="btn btn-sm btn-info"
    >
      Publish
    </button>,
  ];

  const handleSort = (key) => {
    // Optional: Add client-side sorting if needed
  };
  if(data.total === 0) return <EmptyPage/>

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Upcoming Meals</h2>
        <Link to={`/dashboard/addedMeals`} className="btn btn-info btn-sm">
          {" "}
        + Add Upcoming Meal{" "}
        </Link>
      </div>

      <Pagination
        headers={headers}
        rows={meals}
        actions={actions}
        page={page}
        total={total}
        setPage={setPage}
        onSort={handleSort}
      />
    </div>
  );
};

export default UpcomingMealsForAdmin;
