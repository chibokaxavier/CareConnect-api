import express from "express";
import { register, login } from "../Controllers/authController.js";

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    let { email, password, name, role, photo, gender } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!(name && email && password)) {
      throw Error("Empty input fields!");
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      throw Error("Invalid name entered!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered!");
    } else if (password.length < 8) {
      throw Error("Password should be at least 8 characters long");
    } else {
      const newUser = await register(req, res);
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    const authenticatedUser = await login(req, res);
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
