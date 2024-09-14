import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from 'bcrypt';


export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    // Check if the password field is in the request body
    if (req.body.password) {
      // Hash the password before updating the user
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Replace the plain password with the hashed password in the request body
      req.body.password = hashedPassword;
    }

    // Proceed with updating the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update',
    });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
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
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Users not found",
    });
  }
};
export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile Info gotten successfully",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong can't get profile",
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // step 1 retrieve appointments from booking for specific user
    const bookings = await Booking.find({ user: req.userId });
    // step 2 extract doctor ids from appointments gotten in step 1
    const doctorIds = bookings.map((el) => el.doctor.id);
    // step 3 retrieve doctors using the ids gotten
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Appointments successfully fetched",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong can't get profile",
    });
  }
};
