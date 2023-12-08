const mongoose = require("mongoose");

const congressSchema = new mongoose.Schema(
  {
    voter_name: {
      type: String,
    },
    party_name: {
      type: String,
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

module.exports = mongoose.model("congress", congressSchema);
