const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../backend/Models/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./Routes/AuthRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
