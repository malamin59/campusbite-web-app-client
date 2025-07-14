import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "../Shard/LoadingSpinner/LoadingSpinner";

const UpdateReview = () => {
  const { id } = useParams();
  console.log(id)
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: review, isLoading } = useQuery({
    queryKey: ["singleReview", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userReview/${id}`);
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const text = e.target.review.value;

    try {
      await axiosSecure.patch(`/userReview/${id}`, { text });
      toast.success("Review updated successfully");
      navigate("/dashboard/my-reviews");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 mt-10 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Your Review</h2>
      <form onSubmit={handleUpdate}>
        <textarea
          name="review"
          defaultValue={review.text}
          rows="4"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <button type="submit" className="btn btn-info mt-4">
          Update Review
        </button>
      </form>
    </div>
  );
};

export default UpdateReview;
