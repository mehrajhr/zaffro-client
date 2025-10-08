import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Pages/Loading/Loading";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Handle search
  useEffect(() => {
    const query = search.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // ✅ Change Role
  const handleChangeRole = async (user) => {
    const newRole = user.role === "admin" ? "customer" : "admin";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to change ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/${user._id}/role`, {
          role: newRole,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: `${user.name}'s role changed to ${newRole}.`,
            icon: "success",
            timer: 2000,
          });
          fetchUsers(); // Refresh list
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to update user role.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-black">
        👥 Manage Users
      </h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md text-black border-black"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-black">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "badge-primary"
                            : "badge-ghost"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleChangeRole(user)}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Change Role
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
