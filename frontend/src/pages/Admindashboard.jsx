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
        // Use user._id if your backend uses MongoDB IDs
        setData((prev) => prev.filter((user) => (user.id || user._id) !== id));
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-500 text-sm">Manage your system users</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
        >
          Logout
        </button>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Registered Users</p>
          <h3 className="text-4xl font-black text-indigo-600 mt-1">{data.length}</h3>
        </div>
        {/* You can add more stat cards here later (e.g., Active Today, New Users) */}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
              <th className="p-4">#</th>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400 italic">
                  No users found in the database.
                </td>
              </tr>
            ) : (
              data.map((user, index) => (
                <tr key={user.id || user._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-gray-500 font-medium">{index + 1}</td>
                  <td className="p-4 font-semibold text-gray-700">{user.username}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(user.id || user._id)}
                      className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-md text-sm font-bold hover:bg-indigo-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id || user._id)}
                      className="bg-red-100 text-red-600 px-4 py-1.5 rounded-md text-sm font-bold hover:bg-red-200 transition"
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
    </div>
  );
};

export default Admindashboard;