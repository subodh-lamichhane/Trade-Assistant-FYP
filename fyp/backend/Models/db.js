// Database connection setup
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGO_CONN;

// Connect to MongoDB database
const connectDB = async () => {
  if (!mongoUrl) {
    throw new Error('Database connection string is missing');
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to database SUCCESSFULLY');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err; 
  }
};

export default connectDB;
