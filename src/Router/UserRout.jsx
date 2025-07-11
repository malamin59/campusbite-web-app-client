import { Navigate } from "react-router";
import LoadingSpinner from "../Shard/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/UseRole";

const UserRout = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "user") return children;
  return <Navigate to="/"></Navigate>;
};

export default UserRout;