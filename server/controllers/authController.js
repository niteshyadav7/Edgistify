const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ fullName, email, password });
    res.status(201).json({ message: "User registered successfully", token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await require("bcryptjs").compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
