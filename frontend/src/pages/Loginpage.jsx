import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login clicked!"); 

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      const user = res.data.user;

      // --- NEW CODE: STORAGE ---
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", user.role);
      
      // We store the username (or email as a fallback) so the dashboard can display it
      localStorage.setItem("username", user.username || user.name || user.email);
      // -------------------------

      toast.success("Login successful!");

      if (user.role === "user") {
        navigate("/userdashboard");
      } else if (user.role === "admin") {
        navigate("/admindashboard");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: 'url("bg.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      zIndex: 0,
    },

   card: {
      width: "400px",
      padding: "30px",
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(6px)",
      borderRadius: "15px",
      boxShadow: "0 0 20px rgba(0,0,0,0.25)",
      zIndex: 10,
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
    },

    input: {
      width: "100%",
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "15px",
      marginBottom: "18px",
      outline: "none",
    },

    passwordBox: {
      position: "relative",
    },

    eyeIcon: {
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#555",
    },

    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "14px",
      marginBottom: "20px",
    },

    link: {
      color: "#1d75e8",
      cursor: "pointer",
      fontWeight: "600",
    },

    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#1d75e8",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "10px",
    },

    bottomText: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={styles.passwordBox}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div style={styles.row}>
           

            <span style={styles.link} onClick={() => navigate("/forgot-password")}>
              Forgot password?
             
            </span>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <div style={styles.bottomText}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}