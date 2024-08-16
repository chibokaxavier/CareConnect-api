import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;
  //   check if token exists
  if (!authToken || !authToken.startswith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token,authorization denied" });
  }
  try {
    console.log(authToken);
  } catch (error) {}
};
