import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Shard/LoadingSpinner/LoadingSpinner";

const AllMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allMeals", page, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getallMeals?page=${page}&limit=10&sortBy=${sortBy}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/meals/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Meal has been deleted.", "success");
          refetch(); //  Refetch the updated meals list
        } else {
          Swal.fire("Error", "Meal could not be deleted.", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };
  if(isLoading) return <LoadingSpinner/>

  return (
    <div>
      <table className="table w-full mt-6">
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <button onClick={() => setSortBy("likes")}>Likes</button>
            </th>
            <th>
              <button onClick={() => setSortBy("reviews_count")}>
                Reviews
              </button>
            </th>
            <th>Rating</th>
            <th>Distributor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.meals?.map((meal) => (
            <tr key={meal._id}>
              <td>{meal.title}</td>
              <td>{meal.likes}</td>
              <td>{meal.reviews_count}</td>
              <td>{meal.rating}</td>
              <td>{user?.displayName}</td>
              <td className="flex gap-2">
                <Link to={`/meal/${meal._id}`}>
                  {" "}
                  <button className="btn btn-xs btn-info">View</button>{" "}
                </Link>
                <Link to={`/dashboard/updateMeal/${meal._id}`}>
                  {" "}
                  <button className="btn btn-xs btn-warning">Update</button>
                </Link>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex sticky top-0 z-50  justify-center mt-4">
        {Array.from({ length: Math.ceil(data?.total / 10) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm mx-1 ${
              page === i + 1 ? "btn-info" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllMeals;
