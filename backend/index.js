const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize, connectDB } = require("./database/database");

// --- 1. IMPORT MODELS HERE ---
// This ensures Sequelize registers the models before sync() runs
const User = require("./models/userModel");
const Income = require("./models/Income");   // Ensure these paths and 
const Saving = require("./models/Saving");   // filenames match exactly
const Expense = require("./models/Expense"); 

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userroute"));
app.use("/api/savings", require("./routes/savingRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use('/api/income', require("./routes/incomeRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Moneymate backend is running" });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    // --- 2. SYNC MODELS ---
    // This will now create the 'Incomes', 'Savings', and 'Expenses' tables
    await sequelize.sync({ alter: true });
    console.log("✅ All tables synced successfully in PostgreSQL");

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
};

startServer();