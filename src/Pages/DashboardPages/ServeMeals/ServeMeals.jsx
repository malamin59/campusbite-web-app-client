import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Pagination from "../../../Shard/Pagination/Pagination";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch requested meals with search and pagination
  const { data = {}, refetch } = useQuery({
    queryKey: ["requestedMeals", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requested-meals?page=${page}&limit=10&search=${search}`
      );
      return res.data;
    },
  });
  console.log(data)

  const requestedMeals = data.data || [];
  const total = data.total || 0;

  const handleServe = async (id) => {
    try {
      await axiosSecure.patch(`/requested-meals/serve/${id}`);
      toast.success("Meal served!");
      refetch();
    } catch (error) {
      toast.error("Failed to serve meal.");
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const headers = [
    { label: "title", key: "title" },
    { label: "User Email", key: "userEmail" },
    { label: "User Name", key: "userName" },
    { label: "Status", key: "status" },
  ];

  const actions = (row) => [
    <button
      key="serve"
      className="btn btn-sm btn-success"
      onClick={() => handleServe(row._id)}
      disabled={row.status === "delivered"}
    >
      {row.status === "delivered" ? "Served" : "Serve"}
    </button>,
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Serve Requested Meals</h2>

      <form onSubmit={handleSearch} className="flex max-w-md mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="input input-bordered w-full rounded-r-none"
        />
        <button className="btn btn-info rounded-l-none">
          <FiSearch />
        </button>
      </form>

      <Pagination
        headers={headers}
        rows={requestedMeals}
        actions={actions}
        page={page}
        total={total}
        setPage={setPage}
        onSort={() => {}}
      />
    </div>
  );
};

export default ServeMeals;
