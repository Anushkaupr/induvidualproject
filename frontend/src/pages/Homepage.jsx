import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative", // required for absolute logo
      backgroundImage: 'url("image.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    logo: {
      position: "absolute",
      top: "20px",
      right: "30px",
      width: "130px",       // adjust size if needed
      height: "auto",
      cursor: "pointer",
      zIndex: 10,
      borderRadius: "8px",
    },

    frame: {
      backgroundColor: "rgba(192, 192, 192, 0.6)",
      padding: "20px 50px",
      borderRadius: "25px",
      textAlign: "center",
      backdropFilter: "blur(8px)",
      boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.25)",
      maxWidth: "600px",
    },

    title: {
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#000", // fixed invalid color
      letterSpacing: "1px",
    },

    subtitle: {
      fontSize: "20px",
      marginBottom: "40px",
      color: "#444",
      fontWeight: "400",
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },

    button: {
      padding: "10px 45px",
      fontSize: "20px",
      borderRadius: "13px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      width: "60%",
      transition: "0.3s ease",
      color: "white",
    },

    loginBtn: {
      backgroundColor: "#1d75e8",
    },

    registerBtn: {
      backgroundColor: "#1d75e8",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Right Logo */}
      <img
        src="/logo.png"   // place logo.png inside /public folder
        alt="Money Mate Logo"
        style={styles.logo}
        onClick={() => navigate("/")}
      />

      {/* Main Card */}
      <div style={styles.frame}>
        <h1 style={styles.title}>Welcome to Money Mate!!</h1>
        <p style={styles.subtitle}>
          Manage your expenses and income easily.
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.loginBtn }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={{ ...styles.button, ...styles.registerBtn }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
