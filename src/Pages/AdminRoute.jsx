import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  if (!userId) {
    alert("Please login to access this page");
    return <Navigate to={"/login"} replace />;
  }

  if (role !== "admin") {
    alert("You are not allowed to access this page");
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default AdminRoute;
