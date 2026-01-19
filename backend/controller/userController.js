const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
exports.register = async (req, res) => {
  try {
    console.log("Received signup request:", req.body);
 
    const { username, email, password } = req.body;
 
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
 
    console.log("User created:", newUser.toJSON());
 
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
 
 
exports.login = async (req, res) => {
  try {
    // Default to empty object if req.body is undefined
    const { email, password } = req.body || {};
 
    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
 
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
 
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
 
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
 
 