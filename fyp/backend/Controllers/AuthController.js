// Auth controller - handles user authentication and profile management
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../Models/User.js";

// Create a new user account
export const signup = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    // Check if email is already in use
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "This email is already registered",
        success: false,
      });
    }

    // Create new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ 
      name, 
      email, 
      password: hashedPassword, 
      pic 
    });

    await newUser.save();

    res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        pic: newUser.pic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Log in existing user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(403).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Create auth token
    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Welcome back!",
      success: true,
      jwtToken,
      name: user.name,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Get user profile details
export const userProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ 
        message: "User not found", 
        success: false 
      });
    }
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        password: "********",
      },
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Something went wrong", 
      success: false 
    });
  }
};

// Update user profile information
export const updateUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    // Update profile picture if uploaded
    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`;
    }

    // Update password if provided
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated",
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
