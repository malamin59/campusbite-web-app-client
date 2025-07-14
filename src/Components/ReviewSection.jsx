import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const ReviewSection = ({ mealId, mealRefetch}) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const { id } = useParams();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${mealId}`);
      return res.data;
    },
  });
    const { data: meal = {}, } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  console.log(meal)
  const handleReview = async () => {
    if (!reviewText) return;

    await axiosSecure.post("/reviews", {
      mealId,
      email: user.email,
      text: reviewText,
      likes:meal.likes,
      title:meal.title,
      reviews_count:meal.reviews_count,
      date: new Date(),
    });

    setReviewText("");
    toast.success("Review Added Successfully!","success");
    refetch();
    mealRefetch()
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
