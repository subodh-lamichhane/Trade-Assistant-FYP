import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGO_CONN;

const connectDB = async () => {
  if (!mongoUrl) {
    throw new Error('MONGO_CONN environment variable is not defined');
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    throw err; 
  }
};

export default connectDB;
