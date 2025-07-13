import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSpinner from "../../../Shard/LoadingSpinner/LoadingSpinner";
import EmptyPage from "../../../Shard/Empty/EmptyPage";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["userReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userReview/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (reviews.length === 0) {
    return <EmptyPage />;
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Reviews</h2>
      <table className="table w-full bg-base-200 rounded">
        <thead>
          <tr>
            <th>Review</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.text}</td>

              <td>{new Date(review.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/meal/${review.mealId}`}>
                  <button className="btn btn-xs btn-info">View Meal</button>
                </Link>
                {/* You can add edit/delete here later */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
