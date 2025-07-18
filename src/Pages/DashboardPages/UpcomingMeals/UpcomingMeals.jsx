import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [likedMeals, setLikedMeals] = useState([]);

  /* get the user data for check the user Badge */
  const { data: userData } = useQuery({
    queryKey: ["user"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  // Get upcoming meals
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcomingMeals");
      return res.data.sort((a, b) => b.likes - a.likes);
    },
  });

  useEffect(() => {
    if (!user?.email || meals.length === 0) return;
    const liked = meals
      .filter((meal) => meal?.liked_users?.includes(user.email))
      .map((meal) => meal._id);

    setLikedMeals(liked);
  }, [meals, user]);

  // Handle Like
  const handleLike = async (mealId) => {
    if (userData?.badge === "Bronze") {
      return toast.error(
        "Only Silver, Gold, or Platinum users can request meals."
      );
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
        refetch(); // Refetch to update likes
      }
    } catch (error) {
      toast.error("Error liking the meal.");
    }
  };

  // Handle Admin Publish
  const handlePublish = async (mealId) => {
    const confirm = await Swal.fire({
      title: "Publish this meal?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, publish it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/meals/publish/${mealId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Published!", "Meal moved to main meals.", "success");
        refetch();
      }
    }
  };

  return (
    <div className=" lg:w-7xl mx-auto grid  lg:grid-cols-4 md:grid-cols-2 gap-6 p-6">
      {meals.map((meal) => (
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
            <p>
              <strong>Likes:</strong> {meal.likes}
            </p>

            <div className="flex justify-between mt-4">
              <button
                className="btn btn-sm btn-outline btn-success"
                disabled={likedMeals.includes(meal._id)}
                onClick={() => handleLike(meal._id)}
              >
                👍 Like
              </button>

              {user?.role === "admin" && (
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={() => handlePublish(meal._id)}
                >
                  🚀 Publish
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMeals;
