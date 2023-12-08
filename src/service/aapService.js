const { Aap } = require("../model");

const createAap = async (body) => {
  return await Aap.create(body);
};

const findAapByEmail = async (email) => {
  return await Aap.findOne(email);
};

const findAapAndUpdate = async (_id, token) => {
  return await Aap.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};

const getAllAap = async (role) => {
  return await Aap.find(role);
};

module.exports = {
  createAap,
  findAapByEmail,
  findAapAndUpdate,
  getAllAap,
};
