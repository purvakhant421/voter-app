const mongoose = require("mongoose");
const partySchema = new mongoose.Schema(
    {
        party_name : {
            type : String,
            trim : true,
        },
        // ref user
        User : {
            type : mongoose.Types.ObjectId,
            ref : "Users"
        },
        is_active : {
            type : Boolean,
            default : true,
        },
    },
    {
        timestamps: true,
        versionkey: false,
    }
);
const Party = mongoose.model("Party",partySchema);
module.exports = Party;