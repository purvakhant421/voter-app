const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    cardNo: {
      type: String,
    },
    user_name: {
      type: String,
    },
    father_Name: {
      type: String,
    },
    sex: {
      type: String,
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
    },
    AssemblyNoandName: {
      type: String,
    },
    partNoandName: {
      type: String,
    },
    role: {
      type: String,
      enum: ["bjp", "user", "congress","aap"],
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", userSchema);
