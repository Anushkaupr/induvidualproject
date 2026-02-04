const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize, connectDB } = require("./database/database");

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userroute"));
app.use("/api/savings", require("./routes/savingRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes")); // <-- Added expense route


// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Moneymate backend is running" });
});

// Start server
// In backend index.js
const startServer = async () => {
  await connectDB();
  // This ensures the 'dob' column is actually created in the database
 await sequelize.sync({ alter: true });
  console.log("Database synced with new DOB column");

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};
startServer();
