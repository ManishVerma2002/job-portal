const Auth = require("../models/UserAuth");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ name, email, role });
    const hashedPassword = await hashPassword(password);

    await Auth.create({ user: user._id, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { userId: user._id, email: user.email }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const auth = await Auth.findOne({ user: user._id });
    if (!auth) return res.status(404).json({ success: false, message: "Authentication record not found" });

    if (auth.accountLocked && auth.lockUntil && auth.lockUntil > Date.now()) {
      return res.status(403).json({ success: false, message: "Account locked. Try again later." });
    }

    const isMatch = await comparePassword(password, auth.password);
    if (!isMatch) {
      auth.loginAttempts += 1;
      if (auth.loginAttempts >= 5) {
        auth.accountLocked = true;
        auth.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 min lock
      }
      await auth.save();
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Reset login attempts
    auth.loginAttempts = 0;
    auth.accountLocked = false;
    auth.lockUntil = null;
    auth.lastLogin = new Date();
    await auth.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { userId: user._id, email: user.email, accessToken, refreshToken }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
