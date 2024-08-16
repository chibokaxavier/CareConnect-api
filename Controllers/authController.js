import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};
export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }
    // check if the user exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }
    if (user === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    return await user.save();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    // check if user does not exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isHashedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isHashedPassword) { 
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // get token
    const token = generateToken(user);
    const { password: hashedPassword, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.log(error);
  }
};
