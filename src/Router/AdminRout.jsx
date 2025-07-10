import { Navigate } from "react-router";
import LoadingSpinner from "../Shard/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/UseRole";

const AdminRouts = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "admin") return children;
  return <Navigate to="/"></Navigate>;
};

export default AdminRouts;