import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/homepage"); // route to homepage
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
    },

    logoContainer: {
      textAlign: "center",
      animation: "fadeIn 1.2s ease-in-out",
    },

    logo: {
      width: "180px",
      height: "auto",
    },

    text: {
      marginTop: "20px",
      fontSize: "22px",
      fontWeight: "600",
      color: "#444",
      letterSpacing: "1px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img
          src="logo.png"   // 👈 your logo here
          alt="Money Mate Logo"
          style={styles.logo}
        />
        <div style={styles.text}>Money Mate</div>
      </div>

      {/* Inline animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}
