import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} from "../Controllers/userController.js";

const router = express.Router();
router.put("/:id", updateUser);
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.get("/:id", deleteUser);
export default router;
