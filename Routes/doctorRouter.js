import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getSingleDoctor);
router.get("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
export default router;
