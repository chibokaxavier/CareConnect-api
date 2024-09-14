import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import bcrypt from "bcrypt";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    if (req.body.name) {
      // Regex to check if name has two words, each with at least 4 characters, separated by a single space
      const nameRegex = /^[a-zA-Z]{4,}\s[a-zA-Z]{4,}$/;

      if (!nameRegex.test(req.body.name.trim())) {
        return res.status(400).json({
          success: false,
          message:
            "Name must contain a first and last name, each more than 4 characters, with only one space between them!",
        });
      }
    }

    // Check if the password field is in the request body
    if (req.body.password) {
      // Hash the password before updating the doctor
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Replace the plain password with the hashed password in the request body
      req.body.password = hashedPassword;
    }

    // Proceed with updating the doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error); // Log the error
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Doctors not found",
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "Profile Info gotten successfully",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong can't get profile",
    });
  }
};
