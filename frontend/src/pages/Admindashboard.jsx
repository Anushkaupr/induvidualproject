import { useState, useEffect } from "react";
import { getAllUserApi, deleteUserById } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Admindashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State for logged in admin name
  const [adminName, setAdminName] = useState("Admin");
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username"); // Clear the name on logout
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    // Get the name we saved during login
    const storedName = localStorage.getItem("username");
    if (storedName) setAdminName(storedName);

    const getAllUser = async () => {
      try {
        const response = await getAllUserApi();
        if (response?.data?.success) {
          setData(response.data.users);
        }
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    getAllUser();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await deleteUserById(id);
      if (response?.data?.success) {
        setData((prev) => prev.filter((user) => (user.id || user._id) !== id));
        toast.success("User deleted");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">Loading Admin Panel...</div>;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col fixed h-full z-10 shadow-xl">
        <div className="p-8 flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div className="text-2xl font-black text-indigo-500 tracking-tighter uppercase">MONEYMATE</div>
        </div>
        
        <nav className="flex-1 mt-4">
          <div className="w-full flex items-center gap-3 px-6 py-4 bg-indigo-600 shadow-lg cursor-default border-l-4 border-white">
            <i className="fas fa-user-shield w-5"></i>
            <span className="font-semibold text-sm uppercase">Admin Panel</span>
          </div>
        </nav>
        
        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={handleLogout} 
            className="w-full bg-white text-red-600 py-3 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">Admin Dashboard</h1>
          
          {/* UPDATED ADMIN PROFILE SECTION */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {/* Dynamic Initial */}
                {adminName.charAt(0).toUpperCase()}
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">System</span>
               <span className="font-bold text-slate-700 leading-none">{adminName}</span>
             </div>
          </div>
        </header>

        {/* HERO STAT CARD */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden mb-8">
            <div className="relative z-10">
              <h2 className="text-sm uppercase tracking-widest opacity-80 font-bold">Total Registered Users</h2>
              <h1 className="text-6xl font-black mt-2 tracking-tight">{data.length}</h1>
              <div className="mt-6 inline-flex bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <p className="text-[10px] uppercase font-bold tracking-widest">Active Database Entries</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 p-8 opacity-10">
               <i className="fas fa-users text-9xl"></i>
            </div>
        </div>

        {/* USER TABLE CONTAINER */}
        <div className="bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-slate-700">
          <h3 className="font-bold text-white text-lg flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center text-sm">
              <i className="fas fa-list-ul"></i>
            </span>
            User Management List
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-700/50">
                  <th className="p-4">#</th>
                  <th className="p-4">Username</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-16 text-center text-slate-500 italic">
                       No users found in the system.
                    </td>
                  </tr>
                ) : (
                  data.map((user, index) => (
                    <tr key={user.id || user._id} className="hover:bg-slate-800/40 transition-all group">
                      <td className="p-4 text-slate-500 font-bold text-sm">{index + 1}</td>
                      <td className="p-4">
                        <span className="text-slate-200 font-bold group-hover:text-indigo-400 transition-colors">
                          {user.username}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-sm font-medium">{user.email}</td>
                      <td className="p-4 text-center space-x-2">
                        <button
                          onClick={() => navigate(`/edituser/${user.id || user._id}`)}
                          className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-[11px] font-black hover:bg-indigo-500 hover:text-white transition-all uppercase tracking-tighter"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id || user._id)}
                          className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl text-[11px] font-black hover:bg-red-500 hover:text-white transition-all uppercase tracking-tighter"
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
      </main>
    </div>
  );
};

export default Admindashboard;