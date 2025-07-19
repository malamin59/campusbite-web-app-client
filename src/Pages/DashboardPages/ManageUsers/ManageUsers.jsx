import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Pagination from "../../../Shard/Pagination/Pagination";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import EmptyPage from "../../../Shard/Empty/EmptyPage";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${page}&limit=10&search=${search}&excludeEmail=${user?.email}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  console.log(data);

  const users = data.users || [];
  const total = data.total || 0;

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Subscription", key: "badge" },
  ];

  // Action buttons per user row
  const actions = (user) => {
    // Show Make Admin button only if user is not admin
    if (user.role !== "admin") {
      return [
        <button
          key="makeAdmin"
          className="btn btn-xs btn-primary"
          onClick={() => handleMakeAdmin(user._id)}
        >
          Make Admin
        </button>,
      ];
    }
    return [];
  };

  // Handle Make Admin API call
  const handleMakeAdmin = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/admin/${userId}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "User is now an admin.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to make user admin.", "error");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  if (data.total === 0) return <EmptyPage />;
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={handleSearchChange}
        className="input input-bordered mb-4 w-full max-w-md"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Pagination
          headers={headers}
          rows={users}
          actions={actions}
          page={page}
          total={total}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default ManageUsers;
