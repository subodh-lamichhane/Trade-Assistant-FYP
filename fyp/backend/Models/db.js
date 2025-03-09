const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Database host
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'trading_db', // 
});

module.exports = pool;

module.exports = connectDB;
