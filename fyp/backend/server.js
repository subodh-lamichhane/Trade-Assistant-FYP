import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnection.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan("combined"));

import userRoute from "./routes/user.Route.js"


dbConnect();
app.use("/User", userRoute)

app.listen(process.env.PORT, () => {
  console.log("Server Connected Successfully"); 

});