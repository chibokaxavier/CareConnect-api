import express from "express";
import { regsiter, login } from "../Controllers/authController.js";

const router = express.Router();
router.post("/register", regsiter);

router.post("/login", login);

export default router;
