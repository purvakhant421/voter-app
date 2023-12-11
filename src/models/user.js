const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
    {
        cardNo:{
            type : String,
            trim : true,
        },
        user_name : {
            type : String,
            trim : true,
        },
        father_name : {
            type : String,
            trim : true,
        },
        sex : {
            type : String,
            trim : true,
        },
        dob : {
            type : String,
            trim : true,
        },
        address : {
            type : String,
            trim : true,
        },
        AssemblyNoandName : {
            type : String,
            trim : true,
        },
        partNoandName : {
            type : String,
            trim : true,
        },
        email : {
            type : String,
            trim : true,
        },
        password : {
            type : String,
        },
        is_active : {
            type : Boolean,
            default : true,
        },
        token: {
            type: String,
          },
    },
    {
        timestamps: true,
        versionkey: false,
    }
);
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("Users" , userSchema);
module.exports = User;