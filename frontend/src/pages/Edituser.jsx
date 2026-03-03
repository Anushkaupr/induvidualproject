import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUserById } from '../services/api';
import toast from 'react-hot-toast';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        // Ensure we don't set undefined if API response structure varies
        if (res?.data?.user) {
          setFormData({
            username: res.data.user.username || '',
            email: res.data.user.email || ''
          });
        }
      } catch (err) {
        toast.error("Failed to fetch user.");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateUserById(id, formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message || "User updated successfully");
        navigate('/admindashboard'); // Redirect back after saving
      } else {
        toast.error(response?.data?.message || "Update failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0f172a] p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-user-edit"></i>
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Edit User</h2>
          </div>
          <p className="text-slate-400 text-sm font-medium">Modify account details for user ID: <span className="text-indigo-400 font-mono text-xs">{id}</span></p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                <i className="fas fa-user"></i>
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                <i className="fas fa-envelope"></i>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 py-3 rounded-2xl font-bold text-sm transition-all"
            >
              Cancel & Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;