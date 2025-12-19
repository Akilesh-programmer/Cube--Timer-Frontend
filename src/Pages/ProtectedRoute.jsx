import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    return children;
  }

  return <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
