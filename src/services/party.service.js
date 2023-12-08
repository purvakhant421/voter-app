const { Party } = require("../models");

// Create Party
const createParty = async (reqBody) => {
  return Party.create(reqBody);
};

// Get Party list
const getPartyList = async (filter, options) => {
  return Party.find().populate("Users");
};


// Get Party details by id
const getPartyById = async (partyId) => {
  return Party.findById(partyId);
};

// Delete Party
const deleteParty = async (partyId) => {
  return Party.findByIdAndDelete(partyId);
};

// Update Party
const updateParty = async (partyId,reqBody) => {
  return Party.findByIdAndUpdate(partyId,{$set:reqBody});
};

// Get Party by email
const getPartyByEmail = async (email) => {
  return Party.findOne({ email });
};

module.exports = {
    createParty,
    getPartyList,
    getPartyById,
    deleteParty,
    updateParty,
    getPartyByEmail
};