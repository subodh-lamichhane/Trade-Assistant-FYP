import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../Models/User.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'A user with the same data already exists!',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword, pic });

    await newUser.save();

    res.status(201).json({
      message: 'Signup successful',
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
      message: 'Internal server error',
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: 'Authentication failed, email or password is wrong',
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: 'Authentication failed, email or password is wrong',
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      success: true,
      jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
        success: false,
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      message: 'Profile updated successfully',
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
