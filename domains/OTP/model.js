const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  email: { type: string, unique: true },
  otp: string,
  createdAt: Date,
  expiresAt: Date,
});
