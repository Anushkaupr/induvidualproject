const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize, connectDB } = require("./database/database");
 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
 
app.use(express.json());
 
app.use("/api/users", require("./routes/userroute"));
 
app.get("/", (req, res) => {
  res.json({ message: "Moneymate backend is running" });
});
 
const startServer = async () => {
  await connectDB();
  await sequelize.sync();
 
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};
 
startServer();
 
 