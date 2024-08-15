import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  authRoute  from "./Routes/auth.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: true,
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

app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(port, () => {
  connectDb();
  console.log(`listening on ${port}`);
});
