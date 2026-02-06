import { useState, useEffect } from "react";
import { getAllUserApi, deleteUserById } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Admindashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔴 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await getAllUserApi();

        if (response?.data?.success) {
          setData(response.data.users);
        } else {
          toast.error(response.data.message || "Failed to fetch users");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getAllUser();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await deleteUserById(id);
      if (response?.data?.success) {
        setData((prev) => prev.filter((user) => user.id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

  if (loading) return <p className="p-4 text-center">Loading data...</p>;

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <table className="border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-2 text-center">
                No users found.
              </td>
            </tr>
          ) : (
            data.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admindashboard;
