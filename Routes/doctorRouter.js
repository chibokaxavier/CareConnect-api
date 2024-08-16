import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
} from "../Controllers/doctorController.js";

const router = express.Router();
router.put("/:id", updateDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getSingleDoctor);
router.get("/:id", deleteDoctor);
export default router;
