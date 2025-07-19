import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import EmptyPage from "../../../Shard/Empty/EmptyPage";
import useRole from "../../../Hooks/UseRole";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [likedMeals, setLikedMeals] = useState([]);
  const [role] = useRole();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const { data: meals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcomingMeals");
      return res.data.sort((a, b) => b.likes - a.likes);
    },
  });

  const upcomingMeals = meals.filter(meal => meal.option === "UpComingMeal");

  useEffect(() => {
    if (!user?.email || upcomingMeals.length === 0) return;
    const liked = upcomingMeals
      .filter((meal) => meal?.liked_users?.includes(user.email))
      .map((meal) => meal._id);

    setLikedMeals(liked);
  }, [upcomingMeals, user]);

  const handleLike = async (mealId) => {
    if (userData?.badge === "Bronze") {
      return toast.error("Only Silver, Gold, or Platinum users can like meals.");
    }

    if (likedMeals.includes(mealId)) {
      return toast.error("You have already liked this meal.");
    }

    try {
      const res = await axiosSecure.patch(`/meals-1/like/${mealId}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Thanks for liking!");
        setLikedMeals((prev) => [...prev, mealId]);
        refetch(); // refetch to update likes + filter again
      }
    } catch (error) {
      toast.error("Error liking the meal.");
    }
  };

  if (upcomingMeals.length === 0) return <EmptyPage />;

  return (
    <div className="lg:w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 p-6">
      {upcomingMeals.map((meal) => (
        <div key={meal._id} className="card shadow-md bg-base-100">
          <figure>
            <img
              src={meal.image}
              alt={meal.title}
              className="h-40 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{meal.title}</h2>
            <p>{meal.description}</p>
            <p><strong>Likes:</strong> {meal.likes}</p>

            <div className="flex justify-between mt-4">
              <button
                className="btn btn-sm btn-outline btn-info"
                disabled={likedMeals.includes(meal._id)}
                onClick={() => handleLike(meal._id)}
              >
                👍 Like
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMeals;
