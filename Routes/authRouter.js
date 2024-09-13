import express from "express";
import { register, login } from "../Controllers/authController.js";

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    let { email, password, name, role, photo, gender } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    // Input validation
    if (!(name && email && password)) {
      return res.status(400).json({ message: "Empty input fields!" });
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      return res.status(400).json({ message: "Invalid name entered!" });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ message: "Invalid email entered!" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters long" });
    }

    // Proceed with registration
    const newUser = await register(req, res);

    // Check if the user was successfully created by the `register` function
    if (newUser) {
      const { password: hashedPassword, ...user } = newUser._doc;
      return res
        .status(200)
        .json({ message: "User created successfully", data: user });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    const authenticatedUser = await login(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
