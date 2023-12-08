const { Congress } = require("../model");

const createCongress = async (body) => {
  return await Congress.create(body);
};

const findCongressByEmail = async (email) => {
  return await Congress.findOne(email);
};

const findCongressAndUpdate = async (_id, token) => {
  return await Congress.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};

const getAllCongress = async (role) => {
  return await Congress.find(role);
};

module.exports = {
  createCongress,
  findCongressByEmail,
  findCongressAndUpdate,
  getAllCongress,
};
