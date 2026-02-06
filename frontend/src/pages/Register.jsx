import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState(""); // <--- Add DOB state
  

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup clicked!"); // debug

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        { username, email, password ,dob}
      );

      // ✅ check success from backend
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      // display backend message if exists, otherwise generic
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
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
    inputContainer: {
      position: "relative",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "8px 0 15px 0",
      border: "1px solid #ccc",
      borderRadius: "8px",
      outline: "none",
      fontSize: "15px",
      paddingRight: "40px",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#555",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#34c759",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
      fontWeight: "bold",
    },
    loginText: {
      textAlign: "center",
      marginTop: "12px",
      fontSize: "14px",
    },
    link: {
      color: "#4a90e2",
      cursor: "pointer",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>

        <form onSubmit={handleSignup}>
          <label>Username</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Date-of-Birth</label>
          <input
            style={styles.input}
            type="date"
            placeholder="Enter your date of birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
           
          <label>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                style={styles.eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                style={styles.eyeIcon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <div style={styles.loginText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
