import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Pagination from "../../../Shard/Pagination/Pagination";

const AllMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  const { data, refetch, isLoading } = useQuery({
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
      text: "This meal will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/meals/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Meal has been deleted.", "success");
        refetch();
      }
    }
  };

  const headers = [
    { label: "Title", key: "title" },
    { label: "Likes", key: "likes", sortKey: "likes" },
    { label: "Reviews", key: "reviews_count", sortKey: "reviews_count" },
    { label: "Rating", key: "rating" },
    { label: "Distributor", key: "distributor_name" },
  ];

  return (
    <Pagination
      headers={headers}
      rows={data?.meals || []}
      actions={(meal) => [
        <Link to={`/meal/${meal._id}`} key="view">
          <button className="btn btn-xs btn-info">View</button>
        </Link>,
        <Link to={`/dashboard/updateMeal/${meal._id}`} key="update">
          <button className="btn btn-xs btn-warning">Update</button>
        </Link>,
        <button
          key="delete"
          onClick={() => handleDelete(meal._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>,
      ]}
      page={page}
      total={data?.total || 0}
      setPage={setPage}
      onSort={(key) => setSortBy(key)}
    />
  );
};

export default AllMeals;
