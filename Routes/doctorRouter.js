import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRoute from "./reviewRouter.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRoute);

router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getSingleDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
export default router;
