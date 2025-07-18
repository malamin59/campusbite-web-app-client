import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
const ReviewSection = ({ mealId, mealRefetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${mealId}`);
      return res.data;
    },
    enabled: !!mealId,
  });


  const { data: meal = {} } = useQuery({
    queryKey: ["meal", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${mealId}`);
      return res.data;
    },
    enabled: !!mealId,
  });
  console.log(meal)

  const handleReview = async () => {
    if (!reviewText) return;
    await axiosSecure.post("/reviews", {
      mealId,
      email: user.email,
      text: reviewText,
      likes: meal.likes,
      title: meal.title,
      reviews_count: meal.reviews_count,
      date: new Date(),
    });

    

    setReviewText("");
    toast.success("Review Added Successfully!");
    refetch();
    mealRefetch();
  };

  return (
    <div>
      {user && (
        <div className="mb-4">
          <textarea
            placeholder="Write a review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="textarea textarea-bordered w-full mb-2"
          ></textarea>
          <button className="btn btn-sm btn-info" onClick={handleReview}>
            Submit Review
          </button>
        </div>
      )}

      <div className="space-y-3">
        {reviews.map((rev, i) => (
          <div key={i} className="p-3 bg-white rounded shadow">
            <p className="text-sm font-medium">{rev.email}</p>
            <p>{rev.text}</p>
            <p className="text-xs text-gray-500">
              {new Date(rev.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
