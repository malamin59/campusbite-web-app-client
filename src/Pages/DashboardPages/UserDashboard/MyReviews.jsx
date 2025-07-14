import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shard/LoadingSpinner/LoadingSpinner";
import EmptyPage from "../../../Shard/Empty/EmptyPage";
import moment from "moment"; 
const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["userReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userReview/${user.email}`);
      return res.data;
    },
  });


  // console.log(reviews)
  const handleDelete = async (reviewId, mealId) => {
    try {
      const res = await axiosSecure.delete(`/userReview/${reviewId}`, {
        data: { mealId },
      });
      if (res.data.deletedCount > 0) {
        toast.success("Review deleted successfully");
        queryClient.invalidateQueries(["userReviews", user?.email]);
      } else {
        toast.error("Failed to delete review");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (reviews.length === 0) return <EmptyPage />;

  return (
    <div className="overflow-x-auto lg:p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Reviews</h2>
      <table className="table w-full bg-base-200 rounded">
        <thead>
          <tr>
            <th>Meal title</th>
            <th>Likes</th>
            <th>Review</th>
            <th className="pl-14">Date</th>
            <th className="pl-14">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.title || "N/A"}</td>
              <td>{review.likes}</td>
              <td>{review.text}</td>
              <td>{moment(review.date).format("YYYY-MM-DD hh:mm A")}</td>
              <td className="space-x-1">
                <Link to={`/meal/${review.mealId}`}>
                  <button className="btn btn-xs btn-info">View</button>
                </Link>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(review._id, review.mealId)}
                >
                  Delete
                </button>
                <Link to={`/dashboard/updateReview/${review._id}`}>
                  <button className="btn btn-xs btn-warning">Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
