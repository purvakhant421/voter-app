const { Congress } = require("../model/index");
const joi = require("joi");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
const { CongressService, congressService } = require("../service");
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

  const data = await congressService.createCongress(filter);

  res.status(200).json({ data });
};

const login = async (req, res) => {
  try {
    // validation;
    const { email, password } = req.body;

    const findCongress = await congressService.findCongressByEmail({ email });

    if (!findCongress) throw Error("Congress not found");

    const successPassword = await bcrypt.compare(password, findCongress.password);
    if (!successPassword) throw Error("Incorrect password");

    let option = {
      email,
      role: findCongress.role,
      exp: moment().add(1, "days").unix(),
    };

    let token;
    if (findCongress && successPassword) {
      token = await jwt.sign(option, jwtSecrectKey);
    }

    let data;
    if (token) {
      data = await congressService.findCongressAndUpdate(findCongress._id, token);
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//creat congress
const createcongress = async (req, res) => {
  try {
    const reqBody = req.body;
    const congress = await congressService.createCongress(reqBody);
    if (!congress) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "congress create successfully!",
      data: { reqBody },
    });
  } catch (error) {
    res.status(400).json({ success: false, message:  error.message});
  }
};

const getAllCongress = async (req, res) => {
  try {
    console.log(req.headers.token,'');
    await auth(req.headers.token, ['congress']);

    const data = await congressService.getAllCongress({ role: "congress" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  createcongress,
  getAllCongress,
};
