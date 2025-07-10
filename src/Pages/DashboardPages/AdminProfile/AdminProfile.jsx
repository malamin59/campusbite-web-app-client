import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-center mt-10">No user is logged in.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded shadow text-center">
      <img
        src={user?.photoURL || "photo"}
        alt={user.displayName || "User Profile"}
        className="mx-auto rounded-full w-32 h-32 object-cover mb-4 border-4 border-info"
      />
      <h2 className="text-2xl font-semibold mb-2">
        {user.displayName || "No Name"}
      </h2>
      <p className="text-lg text-gray-700">{user.email || "No Email"}</p>
    </div>
  );
};

export default AdminProfile;
