// Authentication routes for user management
import { Router } from "express";
import {
  signupValidation,
  loginValidation,
} from "../Middlewares/AuthValidation.js";
import {
  signup,
  login,
  updateUserProfile,
  userProfile,
} from "../Controllers/AuthController.js";
import { protect } from "../Middlewares/AuthMiddleware.js";
import multer from "multer";
import UserModel from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Set up file upload configuration
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

const router = Router();

// Basic auth routes
router.post("/login", loginValidation, login);
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            phoneNumber: phoneNumber || '',
        });

        await newUser.save();

        const jwtToken = jwt.sign(
            { _id: newUser._id, email: newUser.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            jwtToken,
            name: newUser.name,
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Failed to register user", error: err.message });
    }
});

// Profile management routes
router.put("/updateProfile", protect, upload.single("profilePicture"), async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, phoneNumber, password } = req.body;
        const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Prepare update data
        const updateData = { name, phoneNumber };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        if (profilePicture) {
            updateData.profilePicture = profilePicture;
        }

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        // Update user
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                profilePicture: updatedUser.profilePicture,
                updatedAt: updatedUser.updatedAt,
            },
        });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ message: "Failed to update profile", error: err.message });
    }
});

// Get user profile
router.get("/profile", protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ message: "Failed to fetch profile", error: err.message });
    }
});

export default router;