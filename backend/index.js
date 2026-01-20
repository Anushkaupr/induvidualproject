const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize, connectDB } = require("./database/database");

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userroute"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Moneymate backend is running" });
});

// DB test route
app.get("/test-db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ success: true, message: "DB connected!" });
  } catch (err) {
    console.error("DB test error:", err);
    res.status(500).json({ success: false, message: "DB connection failed", error: err.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // auto-create tables
    console.log("Database connected and synced");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
