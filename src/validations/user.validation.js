const Joi = require("joi");

/** create user */
const createUser = {
  body: Joi.object().keys({
    cardNo: Joi.string().required().trim(),
    user_name: Joi.string().required().trim(),
    father_name: Joi.string().required().trim(),
    sex: Joi.string().required().trim(),
    dob: Joi.string().required().trim(),
    address: Joi.string().required().trim(),
    AssemblyNoandName: Joi.string().required().trim(),
    partNoandName: Joi.string().required().trim(),
    email: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  }),
};

module.exports = {
    createUser
}