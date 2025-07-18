import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Pagination from "../../../Shard/Pagination/Pagination";
import LoadingSpinner from "../../../Shard/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import EmptyPage from "../../../Shard/Empty/EmptyPage";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  // Fetch reviews with pagination
  const { data, isLoading } = useQuery({
    queryKey: ["allReviews", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?page=${page}&limit=10`);
      return res.data;
    },
  });
    // Delete Review with SweetAlert + cache update
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data?.success) {
        toast.success("Review has been deleted.");
        queryClient.setQueryData(["allReviews", page], (oldData) => {
          if (!oldData) return;
          return {
            ...oldData,
            review: oldData.review.filter((item) => item._id !== id),
            total: oldData.total - 1, 
          };
        });
      }
    } 
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-info">All Reviews</h2>

      {data?.review?.length === 0 ? (
       <EmptyPage/>
      ) : (
        <Pagination
          headers={[
            { label: "Title", key: "title" },
            { label: "Likes", key: "likes" },
            { label: "Reviews Count", key: "reviews_count" },
          ]}
          rows={data.review}
          page={page}
          total={data.total}
          setPage={setPage}
          actions={(row) => [
            <Link to={`/meal/${row.mealId}`} key="view">
              <button className="btn btn-xs btn-info">View</button>
            </Link>,
            <button
              key="delete"
              onClick={() => handleDelete(row._id)}
              className="btn btn-xs btn-error"
            >
              Delete
            </button>,
          ]}
        />
      )}
    </div>
  );
};

export default AllReviews;
