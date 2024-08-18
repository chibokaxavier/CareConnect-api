import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({
      success: true,
      message: "Reviews  found",
      data: reviews,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Reviews not found",
    });
  }
};
