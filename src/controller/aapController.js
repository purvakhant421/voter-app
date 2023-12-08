const { Aap } = require("../model/index");
const joi = require("joi");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
const { AapService, aapService } = require("../service");
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

  const data = await aapService.createAap(filter);

  res.status(200).json({ data });
};

const login = async (req, res) => {
  try {
    // validation;
    const { email, password } = req.body;

    const findAap = await aapService.findAapByEmail({ email });

    if (!findAap) throw Error("Aap not found");

    const successPassword = await bcrypt.compare(password, findAap.password);
    if (!successPassword) throw Error("Incorrect password");

    let option = {
      email,
      role: findAap.role,
      exp: moment().add(1, "days").unix(),
    };

    let token;
    if (findAap && successPassword) {
      token = await jwt.sign(option, jwtSecrectKey);
    }

    let data;
    if (token) {
      data = await aapService.findAapAndUpdate(findAap._id, token);
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//creat Aap
const createAap = async (req, res) => {
  try {
    const reqBody = req.body;
    const aap = await aapService.createAap(reqBody);
    if (!aap) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "aap create successfully!",
      data: { reqBody },
    });
  } catch (error) {
    res.status(400).json({ success: false, message:  error.message});
  }
};

const getAllAap = async (req, res) => {
  try {
    console.log(req.headers.token,'');
    await auth(req.headers.token, ['aap']);

    const data = await AapService.getAllAap({ role: "aap" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  createAap,
  getAllAap,
};
