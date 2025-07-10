import useRole from "../../../Hooks/UseRole";
import AdminProfile from "../AdminProfile/AdminProfile";
import UserDashboardHome from "../UserDashboard/UserDashboardHome";


const AdminHome = () => {
  const [role] = useRole();
  return (
    <div>
      {role === "admin" && <AdminProfile />}
      {role === "user" && <UserDashboardHome />}
    </div>
  );
};

export default AdminHome;
