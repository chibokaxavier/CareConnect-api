import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/BookingContoller.js";

const router = express.Router();
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);

export default router;
