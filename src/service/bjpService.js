const { Bjp } = require("../model");

const createBjp = async (body) => {
  return await Bjp.create(body);
};

const findBjpByEmail = async (email) => {
  return await Bjp.findOne(email);
};

const findBjpAndUpdate = async (_id, token) => {
  return await Bjp.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};



const getAllBjp = async (role) => {
  return await Bjp.find(role);
};

module.exports = {
  createBjp,
  findBjpByEmail,
  findBjpAndUpdate,
  getAllBjp,
};
