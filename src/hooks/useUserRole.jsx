import { useState, useEffect, useCallback } from "react";
import useAuthcontext from "./useAuthcontext";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuthcontext();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRole = useCallback(async () => {
    if (!user || !user?.email || authLoading) return;

    try {
      setRoleLoading(true);
      const res = await axiosSecure.get(`/role/users?email=${user.email}`);
      setRole(res.data.role);
      setError(null);
    } catch (err) {
      console.error("Error fetching user role:", err);
      setError(err.message);
    } finally {
      setRoleLoading(false);
    }
  }, [user?.email, authLoading, axiosSecure]);

  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  return {
    role,
    roleLoading,
    error,
    refetchRole: fetchUserRole,
  };
};

export default useUserRole;
