import React from "react";
import Loading from "../Pages/Loading/Loading";
import { Navigate } from "react-router";
import useAuthcontext from "../hooks/useAuthcontext";
import useUserRole from "../hooks/useUserRole";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuthcontext();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/"></Navigate>;
  } else if (role !== "admin") {
    return <Navigate to="/forbidden"></Navigate>;
  } else return children;
};
export default AdminRoutes;
