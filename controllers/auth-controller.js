const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../config/jwt");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, address, latitude, longitude } = req.body;
    const day = new Date().getDay();

    // Validation
    if (!name || !email || !password || !address) {
      return res.status(400).json({
        status_code: 400,
        message: "Name, email, password and address are required",
      });
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status_code: 409,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      latitude: latitude || null,
      longitude: longitude || null,
      status: "active",
      registeredDay: day,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      status_code: 201,
      message: "User registered successfully",
      data: {
        name: user.name,
        email: user.email,
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude,
        status: user.status,
        registered_at: user.createdAt,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        status_code: 400,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status_code: 401,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        status_code: 401,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      status_code: 200,
      message: "Login successful",
      data: {
        name: user.name,
        email: user.email,
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude,
        status: user.status,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};
