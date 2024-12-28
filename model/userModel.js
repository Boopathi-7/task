import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const getUser = async (mail) => {
  return await User.findOne({ mail });
};

export const getAllUsers = async () => {
  return await User.find();
};
