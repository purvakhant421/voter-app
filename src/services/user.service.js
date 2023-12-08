const { Users } = require("../models");

// Create user
const createUser = async (reqBody) => {
  return Users.create(reqBody);
};

// Get user list
const getUserList = async (filter, options) => {
  // const skip = (Number(options.page || 1) - 1) * Number(options.limit || 10);
  return Users.find();
  // return Users.find({$or:[{is_active:false}]});
};

// Get user by email
const getUserByEmail = async (email) => {
  return Users.findOne({ email });
};

// Get user details by id
const getUserById = async (userId) => {
  return Users.findById(userId);
};

// user details update by id
const updateDetails = async (userId, reqBody) => {
  return Users.findByIdAndUpdate(userId, { $set: reqBody });
};

// Delete user
const deleteUser = async (userId) => {
  return Users.findByIdAndDelete(userId);
};

module.exports = {
  createUser,
  getUserList,
  getUserById,
  updateDetails,
  getUserByEmail,
  deleteUser,
};