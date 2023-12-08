const { userService, emailService } = require("../services");

const register = async (req, res) => {
  // validation;
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 8);

  let option = {
    email,
    exp: moment().add(1, "days").unix(),
  };

  const token = await jwt.sign(option, jwtSecrectKey);

  const filter = {
    email,
    password: hashPassword,
    token,
  };

  const data = await userService.createUser(filter);

  res.status(200).json({ data });
};

const login = async (req, res) => {
  try {
    // validation;
    const { email, password } = req.body;

    const findUser = await userService.findUserByEmail({ email });

    if (!findUser) throw Error("User not found");

    const successPassword = await bcrypt.compare(password, findUser.password);
    if (!successPassword) throw Error("Incorrect password");

    let option = {
      email,
      exp: moment().add(1, "days").unix(),
    };

    let token;
    if (findUser && successPassword) {
      token = await jwt.sign(option, jwtSecrectKey);
    }

    let data;
    if (token) {
      data = await userService.findUserAndUpdate(findUser._id, token);
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


/** create user */
const createUser = async (req, res) => {
  try {
    const reqBody = req.body;
  const user = await userService.createUser(reqBody);
    if (!user) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "User create successfully!",
      data: { reqBody },
    });
  } catch (error) {
    res.status(400).json({ success: false, message:  error.message});
  }
};

/** Get user list */
const getUserList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }
    const getList = await userService.getUserList(filter, options);

    res.status(200).json({
      success: true,
      message: "Get user list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get user details by id */
const getUserDetails = async (req, res) => {
  try {
    const getDetails = await userService.getUserById(req.params.userId);
    if (!getDetails) {
      throw new Error("User not found!");
    }

    res.status(200).json({
      success: true,
      message: "User details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** user details update by id */
const updateDetails = async (req, res) => {
  try {
    const reqBody = req.body;
    const userId = req.params.userId;
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }

    await userService.updateDetails(userId, reqBody);

    res.status(200)
      .json({ success: true, message: "User details update successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete user */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Send mail to reqested email */
const sendMail = async (req, res) => {
  try {
    const reqBody = req.body;
    const sendEmail = await emailService.sendMail(
      reqBody.email,
      reqBody.subject,
      reqBody.text
    );
    if (!sendEmail) {
      throw new Error("Something went wrong, please try again or later.");
    }
    res.status(200)
      .json({ success: true, message: "Email send successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  register,
  login,
  createUser,
  getUserList,
  getUserDetails,
  updateDetails,
  deleteUser,
  sendMail,
};