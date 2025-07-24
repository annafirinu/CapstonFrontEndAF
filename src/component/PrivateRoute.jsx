import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
