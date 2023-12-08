const { Bjp } = require("../model/index");
const joi = require("joi");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
const { bjpService } = require("../service");
const { auth } = require("../middleware/auth");

// const validation = {
//   body: joi.object.keys({
//     email: joi.string(),
//     password: joi.string(),
//   }),
// };

const register = async (req, res) => {
  // validation;
  const { email, password, role } = req.body;

  const hashPassword = await bcrypt.hash(password, 8);

  let option = {
    email,
    role,
    exp: moment().add(1, "days").unix(),
  };

  const token = await jwt.sign(option, jwtSecrectKey);

  const filter = {
    email,
    role,
    password: hashPassword,
    token,
  };

  const data = await bjpService.createBjp(filter);

  res.status(200).json({ data });
};

const login = async (req, res) => {
  try {
    // validation;
    const { email, password } = req.body;

    const findBjp = await bjpService.findBjpByEmail({ email });

    if (!findBjp) throw Error("Bjp not found");

    const successPassword = await bcrypt.compare(password, findBjp.password);
    if (!successPassword) throw Error("Incorrect password");

    let option = {
      email,
      role: findBjp.role,
      exp: moment().add(1, "days").unix(),
    };

    let token;
    if (findBjp && successPassword) {
      token = await jwt.sign(option, jwtSecrectKey);
    }

    let data;
    if (token) {
      data = await bjpService.findBjpAndUpdate(findBjp._id, token);
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//creat bjp
const createBjp = async (req, res) => {
  try {
    const reqBody = req.body;
    const bjp = await bjpService.createBjp(reqBody);
    if (!bjp) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "bjp create successfully!",
      data: { reqBody },
    });
  } catch (error) {
    res.status(400).json({ success: false, message:  error.message});
  }
};


const getAllBjp = async (req, res) => {
  try {
    console.log(req.headers.token,'');
    await auth(req.headers.token, ['bjp']);

    const data = await bjpService.getAllBjp({ role: "bjp" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  createBjp,
  getAllBjp,
};
