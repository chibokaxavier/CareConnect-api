import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/authRouter.js";
import userRoute from "./Routes/userRouter.js";
import doctorRoute from "./Routes/doctorRouter.js";
import reviewRoute from "./Routes/reviewRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected to the database");
  } catch (error) {
    console.log("mongoose connection to the database failed");
  }
};
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);

app.listen(port, () => {
  connectDb();
  console.log(`listening on ${port}`);
});
