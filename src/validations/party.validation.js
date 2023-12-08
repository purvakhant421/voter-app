const Joi = require("joi");

/** create  */
const createParty = {
  body: Joi.object().keys({
    party_name: Joi.string().required().trim(),
    user: Joi.string().required().trim(),
  }),
};

/** Send mail */
const sendMail = {
  body: Joi.object({
    email: Joi.string().required().trim().email(),
    subject: Joi.string().required().trim(),
    text: Joi.string().required().trim(),
  }),
};


module.exports = {
    createParty,
    sendMail
}