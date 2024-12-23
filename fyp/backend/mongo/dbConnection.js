import mongoose from "mongoose";
export const dbConnect = () => {
mongoose.set('strictQuery', true);

  mongoose.connect(process.env.dburl, () => {
    console.log("Database Connected");
  });
};