import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import ReviewSection from "../../Components/ReviewSection";
import toast from "react-hot-toast";
import { FaThumbsUp, FaUtensils } from "react-icons/fa";

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(id);
  const { data: meal = {}, refetch } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  /* get the user data for check the user Badge */
  const { data: userData } = useQuery({
    queryKey: ["user"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  console.table(userData?.email);

  const handleLike = async () => {
    if (user.email === meal?.distributor_email)
      return toast.error("you can't like you own post ");
    if (!user)
      return Swal.fire("Login Required", "Please login to like", "warning");
    await axiosSecure.patch(`/meals/like/${id}`);
    toast.success("You liked the meal", "success");
    refetch();
  };

  const handleRequestMeal = async () => {
    if (user.email === meal?.distributor_email) return toast.error("you can't request your meal")
    if (!user) return Swal.fire("Login Required", "Please login", "warning");
    if (userData?.badge === "Bronze") {
      return toast.error(
        "Only Silver, Gold, or Platinum users can request meals."
      );
    }

    await axiosSecure.post("/meal-requests", {
      mealId: id,
      userEmail: user.email,
      userName: user?.displayName,
      status: "pending",
      reviews_count: meal.reviews_count,
      title: meal.title,
      likes: meal.likes,
    });

    Swal.fire("Requested!", "Your meal request is pending", "success");
  };
  // if(user.email === user)

  return (
    <div className="max-w-4xl mx-auto my-4 p-6 bg-base-200 rounded-lg">
      <img
        src={meal.image}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{meal.title}</h2>
      <p className="text-sm text-gray-500 mb-2">By: {meal.distributor_name}</p>
      <p className="text-gray-700 mb-4">{meal.description}</p>
      <p>
        <strong>Ingredients:</strong> {meal.ingredients}
      </p>
      <p>
        <strong>Posted:</strong> {new Date(meal.post_time).toLocaleString()}
      </p>
      <p>
        <strong>Price:</strong> {meal.price}
      </p>
      <p>
        <strong>Rating:</strong> {meal.rating}
      </p>
      <p>
        <strong>Likes:</strong> {meal.likes}
      </p>
      <div className="flex gap-4 mt-4">
        <button
          className="btn btn-info flex items-center gap-2"
          onClick={handleLike}
        >
          <FaThumbsUp /> Like
        </button>

        <button
          className="btn btn-info flex items-center gap-2"
          onClick={handleRequestMeal}
        >
          <FaUtensils /> Request Meal
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">
          Reviews ({meal.reviews_count})
        </h3>
        <ReviewSection userData={meal} mealId={id} mealRefetch={refetch} />
      </div>
    </div>
  );
};

export default MealDetails;
