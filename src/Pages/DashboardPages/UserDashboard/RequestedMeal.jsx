import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import EmptyPage from "../../../Shard/Empty/EmptyPage";

const RequestedMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requestedMeals = [], refetch } = useQuery({
    queryKey: ["requestedMeals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal-requests/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(requestedMeals)
    const handleCancel = async (id) => {
    await axiosSecure.delete(`/meal-request/${id}`);
    refetch();
  };
  if(requestedMeals.length === 0) return <EmptyPage/>

  return (
    <div className="overflow-x-auto  mt-6 min-w-full">
      <h2 className="text-2xl font-bold mb-4">Requested Meals</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Meal Title</th>
            <th>Likes</th>
            <th>Reviews</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requestedMeals.map((meal) => (
            <tr key={meal._id}>
              <td>{meal.title}</td>
              <td>{meal?.likes || 0}</td>
              <td>{meal?.reviews_count || 0}</td>
              <td>
                <span
                  className={`badge badge-${
                    meal.status === "pending" ? "warning" : "success"
                  }`}
                >
                  {meal.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleCancel(meal._id)}
                  className="btn btn-sm btn-error"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedMeal;
