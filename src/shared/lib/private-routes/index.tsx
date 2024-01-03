import { getToken } from "..";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  // get token

  const token = getToken();

  // redirect to login page if user not logged

  if (!token) return <Navigate to={"/login"} />;

  // redirect to home page if user logged

  return <Outlet />;
};
