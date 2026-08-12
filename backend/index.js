const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); // Added path module
const { sequelize, connectDB } = require("./database/database");

const User = require("./models/userModel");
const Income = require("./models/Income");
const Saving = require("./models/Saving");
const Expense = require("./models/Expense"); 
const Wishlist = require("./models/Wishlist");

app.use(cors({
  origin: "https://moneymateproject-dzx3x7ake-moneymate1.vercel.app",
  credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/users", require("./routes/userroute"));
app.use("/api/savings", require("./routes/savingRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use('/api/income', require("./routes/incomeRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Moneymate backend is running" });
});

const startServer = async () => {
  try {
    await connectDB();
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