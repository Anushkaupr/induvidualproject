import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/reset-password-dob", {
        email,
        dob,
        newPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login"); // Take them back to login
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  // Reuse your Register.jsx styles here
  const styles = {
    container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: "url('/bg.jpg')", backgroundSize: "cover" },
    card: { width: "400px", padding: "30px", background: "rgba(255, 255, 255, 0.9)", borderRadius: "15px", boxShadow: "0 0 20px rgba(0,0,0,0.25)" },
    title: { textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" },
    input: { width: "100%", padding: "12px", margin: "8px 0 15px 0", border: "1px solid #ccc", borderRadius: "8px" },
    button: { width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
    link: { color: "#4a90e2", cursor: "pointer", display: "block", textAlign: "center", marginTop: "15px" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <form onSubmit={handleReset}>
          <label>Email Address</label>
          <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label>Verify Date of Birth</label>
          <input style={styles.input} type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

          <label>New Password</label>
          <input style={styles.input} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

          <button type="submit" style={styles.button}>Update Password</button>
        </form>
        <span style={styles.link} onClick={() => navigate("/login")}>Back to Login</span>
      </div>
    </div>
  );
}