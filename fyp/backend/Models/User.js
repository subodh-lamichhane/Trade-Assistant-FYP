// User model - stores user account information
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define user data structure
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '', 
  },
  completedChapters: {
    type: [Number], 
    default: [], 
  },
}, {
  timestamps: true,
});

// Create and export the user model
const UserModel = model('users', UserSchema);

export default UserModel;
