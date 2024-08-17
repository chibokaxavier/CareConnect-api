import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.get("/", authenticate, restrict(["admin"]), getAllUsers);
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/:id", authenticate, restrict(["patient"]), deleteUser);
export default router;
